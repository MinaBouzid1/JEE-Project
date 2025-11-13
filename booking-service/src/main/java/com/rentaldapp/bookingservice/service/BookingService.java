package com.rentaldapp.bookingservice.service;

import com.rentaldapp.bookingservice.exception.InvalidBookingException;
import com.rentaldapp.bookingservice.exception.PropertyNotAvailableException;
import com.rentaldapp.bookingservice.exception.ReservationNotFoundException;
import com.rentaldapp.bookingservice.model.dto.CreateBookingDTO;
import com.rentaldapp.bookingservice.model.dto.PriceBreakdownDTO;
import com.rentaldapp.bookingservice.model.dto.ReservationResponseDTO;
import com.rentaldapp.bookingservice.model.entity.PropertyVersion;
import com.rentaldapp.bookingservice.model.entity.Reservation;
import com.rentaldapp.bookingservice.model.entity.ReservationStatusHistory;
import com.rentaldapp.bookingservice.model.enums.ReservationStatus;
import com.rentaldapp.bookingservice.repository.PropertyVersionRepository;
import com.rentaldapp.bookingservice.repository.ReservationRepository;
import com.rentaldapp.bookingservice.repository.ReservationStatusHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingService {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private ReservationStatusHistoryRepository statusHistoryRepository;

    @Autowired
    private PriceCalculationService priceCalculationService;

    // ✅ NOUVEAU : Injection du repository PropertyVersion
    @Autowired
    private PropertyVersionRepository propertyVersionRepository;

    @Transactional
    public ReservationResponseDTO createBooking(CreateBookingDTO createBookingDTO, Integer userId) {
        // Validation des dates
        validateDates(createBookingDTO.getCheckInDate(), createBookingDTO.getCheckOutDate());

        // ✅ NOUVEAU : Déterminer la version de la propriété
        Integer versionId = determinePropertyVersion(
                createBookingDTO.getPropertyId(),
                createBookingDTO.getVersionId()
        );

        // Vérifier la disponibilité
        List<Reservation> overlapping = reservationRepository.findOverlappingReservations(
                createBookingDTO.getPropertyId(),
                createBookingDTO.getCheckInDate(),
                createBookingDTO.getCheckOutDate()
        );

        if (!overlapping.isEmpty()) {
            throw new PropertyNotAvailableException(
                    "La propriété n'est pas disponible pour ces dates"
            );
        }

        // Vérifier que l'utilisateur n'a pas déjà une réservation pour la même propriété aux mêmes dates
        boolean hasOverlapping = reservationRepository.existsOverlappingReservationForUser(
                userId,
                createBookingDTO.getPropertyId(),
                createBookingDTO.getCheckInDate(),
                createBookingDTO.getCheckOutDate()
        );

        if (hasOverlapping) {
            throw new InvalidBookingException(
                    "Vous avez déjà une réservation pour cette propriété pendant ces dates"
            );
        }

        // Calculer le nombre de nuits
        long totalNights = ChronoUnit.DAYS.between(
                createBookingDTO.getCheckInDate(),
                createBookingDTO.getCheckOutDate()
        );

        // TODO: Récupérer les prix depuis Property Service via Feign Client
        // Pour l'instant, utiliser des valeurs par défaut
        Double pricePerNight = new Double("100.00");
        Double cleaningFee = new Double("50.00");
        Double petFee = createBookingDTO.getHasPets() ? new Double("30.00") : 0.0;

        // Calculer le prix
        PriceBreakdownDTO priceBreakdown = priceCalculationService.calculatePrice(
                createBookingDTO.getCheckInDate(),
                createBookingDTO.getCheckOutDate(),
                pricePerNight,
                null,  // weeklyPrice
                null,  // monthlyPrice
                cleaningFee,
                petFee,
                null   // discountPercentage
        );

        // Créer la réservation
        Reservation reservation = new Reservation();
        reservation.setPropertyId(createBookingDTO.getPropertyId());
        reservation.setVersionId(versionId);  // ✅ NOUVEAU : Assigner la version
        reservation.setUserId(userId);
        reservation.setCheckInDate(createBookingDTO.getCheckInDate());
        reservation.setCheckOutDate(createBookingDTO.getCheckOutDate());
        reservation.setTotalNights((int) totalNights);
        reservation.setNumGuests(createBookingDTO.getNumGuests());
        reservation.setStatus(ReservationStatus.PENDING);

        // Prix
        reservation.setLockedPricePerNight(priceBreakdown.getLockedPricePerNight());
        reservation.setBaseAmount(priceBreakdown.getBaseAmount());
        reservation.setDiscountAmount(priceBreakdown.getDiscountAmount());
        reservation.setCleaningFee(priceBreakdown.getCleaningFee());
        reservation.setPetFee(priceBreakdown.getPetFee());
        reservation.setServiceFee(priceBreakdown.getServiceFee());
        reservation.setTotalAmount(priceBreakdown.getTotalAmount());
        reservation.setPlatformFeePercentage(priceBreakdown.getPlatformFeePercentage());

        // Sauvegarder
        Reservation savedReservation = reservationRepository.save(reservation);

        // Enregistrer l'historique du statut
        saveStatusHistory(savedReservation.getId(), null, ReservationStatus.PENDING.name(), userId, "Réservation créée");

        return convertToDTO(savedReservation);
    }

    // ✅ NOUVELLE MÉTHODE : Déterminer la version de la propriété
    private Integer determinePropertyVersion(Integer propertyId, Integer requestedVersionId) {
        // Si une version spécifique est demandée, la valider
        if (requestedVersionId != null) {
            PropertyVersion version = propertyVersionRepository.findById(requestedVersionId)
                    .orElseThrow(() -> new InvalidBookingException("Version de propriété invalide"));

            // Vérifier que la version correspond bien à la propriété
            if (!version.getPropertyId().equals(propertyId)) {
                throw new InvalidBookingException("La version ne correspond pas à la propriété");
            }

            return requestedVersionId;
        }

        // Sinon, utiliser la dernière version de la propriété
        PropertyVersion latestVersion = propertyVersionRepository
                .findLatestVersionByPropertyId(propertyId)
                .orElseThrow(() -> new InvalidBookingException(
                        "Aucune version trouvée pour cette propriété. La propriété doit avoir au moins une version."
                ));

        return latestVersion.getVersionId();
    }

    @Transactional(readOnly = true)
    public ReservationResponseDTO getReservationById(Integer id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ReservationNotFoundException("Réservation non trouvée avec l'ID: " + id));
        return convertToDTO(reservation);
    }

    @Transactional(readOnly = true)
    public List<ReservationResponseDTO> getUserReservations(Integer userId) {
        return reservationRepository.findByUserId(userId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ReservationResponseDTO> getPropertyReservations(Integer propertyId) {
        return reservationRepository.findByPropertyId(propertyId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ReservationResponseDTO> getUpcomingReservations(Integer userId) {
        return reservationRepository.findUpcomingReservationsByUser(userId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ReservationResponseDTO> getPastReservations(Integer userId) {
        return reservationRepository.findPastReservationsByUser(userId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public ReservationResponseDTO confirmReservation(Integer reservationId, String blockchainTxHash) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new ReservationNotFoundException("Réservation non trouvée"));

        if (reservation.getStatus() != ReservationStatus.PENDING) {
            throw new InvalidBookingException("Seules les réservations en attente peuvent être confirmées");
        }

        ReservationStatus oldStatus = reservation.getStatus();
        reservation.setStatus(ReservationStatus.CONFIRMED);
        reservation.setBlockchainTxHash(blockchainTxHash);

        Reservation updated = reservationRepository.save(reservation);

        // Historique
        saveStatusHistory(reservationId, oldStatus.name(), ReservationStatus.CONFIRMED.name(),
                reservation.getUserId(), "Paiement confirmé");

        return convertToDTO(updated);
    }

    @Transactional
    public ReservationResponseDTO checkIn(Integer reservationId, Integer userId) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new ReservationNotFoundException("Réservation non trouvée"));

        if (reservation.getStatus() != ReservationStatus.CONFIRMED) {
            throw new InvalidBookingException("Seules les réservations confirmées peuvent être check-in");
        }

        // Vérifier que c'est le jour du check-in ou après
        if (LocalDateTime.now().isBefore(reservation.getCheckInDate())) {
            throw new InvalidBookingException("Le check-in ne peut être effectué avant la date prévue");
        }

        ReservationStatus oldStatus = reservation.getStatus();
        reservation.setStatus(ReservationStatus.CHECKED_IN);

        Reservation updated = reservationRepository.save(reservation);

        // Historique
        saveStatusHistory(reservationId, oldStatus.name(), ReservationStatus.CHECKED_IN.name(),
                userId, "Check-in effectué");

        return convertToDTO(updated);
    }

    @Transactional
    public ReservationResponseDTO checkOut(Integer reservationId, Integer userId) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new ReservationNotFoundException("Réservation non trouvée"));

        if (reservation.getStatus() != ReservationStatus.CHECKED_IN) {
            throw new InvalidBookingException("Seules les réservations avec check-in peuvent être check-out");
        }

        // Vérifier que c'est le jour du check-out ou après
        if (LocalDateTime.now().isBefore(reservation.getCheckOutDate())) {
            throw new InvalidBookingException("Le check-out ne peut être effectué avant la date prévue");
        }

        ReservationStatus oldStatus = reservation.getStatus();
        reservation.setStatus(ReservationStatus.COMPLETED);

        Reservation updated = reservationRepository.save(reservation);

        // Historique
        saveStatusHistory(reservationId, oldStatus.name(), ReservationStatus.COMPLETED.name(),
                userId, "Check-out effectué");

        // TODO: Déclencher la libération de l'escrow via Payment Service

        return convertToDTO(updated);
    }

    @Transactional
    public ReservationResponseDTO cancelReservation(Integer reservationId, Integer userId, String reason) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new ReservationNotFoundException("Réservation non trouvée"));

        if (reservation.getStatus() == ReservationStatus.COMPLETED ||
                reservation.getStatus() == ReservationStatus.CANCELLED) {
            throw new InvalidBookingException("Cette réservation ne peut pas être annulée");
        }

        ReservationStatus oldStatus = reservation.getStatus();
        reservation.setStatus(ReservationStatus.CANCELLED);
        reservation.setCancelledAt(LocalDateTime.now());

        Reservation updated = reservationRepository.save(reservation);

        // Historique
        saveStatusHistory(reservationId, oldStatus.name(), ReservationStatus.CANCELLED.name(),
                userId, reason != null ? reason : "Annulation demandée");

        // TODO: Déclencher le remboursement via Payment Service selon la politique d'annulation

        return convertToDTO(updated);
    }

    @Transactional
    public ReservationResponseDTO releaseEscrow(Integer reservationId, String txHash) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new ReservationNotFoundException("Réservation non trouvée"));

        if (reservation.getStatus() != ReservationStatus.COMPLETED) {
            throw new InvalidBookingException("L'escrow ne peut être libéré que pour les réservations terminées");
        }

        if (reservation.getEscrowReleased()) {
            throw new InvalidBookingException("L'escrow a déjà été libéré");
        }

        reservation.setEscrowReleased(true);
        reservation.setEscrowReleaseTxHash(txHash);

        Reservation updated = reservationRepository.save(reservation);

        return convertToDTO(updated);
    }

    private void validateDates(LocalDateTime checkInDate, LocalDateTime checkOutDate) {
        if (checkInDate.isBefore(LocalDateTime.now())) {
            throw new InvalidBookingException("La date d'arrivée doit être dans le futur");
        }

        if (checkOutDate.isBefore(checkInDate) || checkOutDate.isEqual(checkInDate)) {
            throw new InvalidBookingException("La date de départ doit être après la date d'arrivée");
        }
    }

    private void saveStatusHistory(Integer reservationId, String oldStatus, String newStatus,
                                   Integer changedBy, String reason) {
        ReservationStatusHistory history = new ReservationStatusHistory();
        history.setReservationId(reservationId);
        history.setOldStatus(oldStatus);
        history.setNewStatus(newStatus);
        history.setChangedBy(changedBy);
        history.setReason(reason);
        statusHistoryRepository.save(history);
    }

    private ReservationResponseDTO convertToDTO(Reservation reservation) {
        ReservationResponseDTO dto = new ReservationResponseDTO();
        dto.setId(reservation.getId());
        dto.setPropertyId(reservation.getPropertyId());
        dto.setVersionId(reservation.getVersionId());  // ✅ NOUVEAU
        dto.setUserId(reservation.getUserId());
        dto.setCheckInDate(reservation.getCheckInDate());
        dto.setCheckOutDate(reservation.getCheckOutDate());
        dto.setTotalNights(reservation.getTotalNights());
        dto.setNumGuests(reservation.getNumGuests());
        dto.setStatus(reservation.getStatus());
        dto.setCancelledAt(reservation.getCancelledAt());
        dto.setCreatedAt(reservation.getCreatedAt());
        dto.setBlockchainTxHash(reservation.getBlockchainTxHash());
        dto.setEscrowReleased(reservation.getEscrowReleased());
        dto.setEscrowReleaseTxHash(reservation.getEscrowReleaseTxHash());

        // Prix
        PriceBreakdownDTO priceBreakdown = new PriceBreakdownDTO(
                reservation.getLockedPricePerNight(),
                reservation.getBaseAmount(),
                reservation.getDiscountAmount(),
                reservation.getCleaningFee(),
                reservation.getPetFee(),
                reservation.getServiceFee(),
                reservation.getTotalAmount(),
                reservation.getPlatformFeePercentage()
        );
        dto.setPriceBreakdown(priceBreakdown);

        return dto;
    }
}