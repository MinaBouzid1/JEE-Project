package com.rentaldapp.bookingservice.service;

import com.rentaldapp.bookingservice.exception.InvalidBookingException;
import com.rentaldapp.bookingservice.exception.ReservationNotFoundException;
import com.rentaldapp.bookingservice.model.dto.ReviewDTO;
import com.rentaldapp.bookingservice.model.entity.Rating;
import com.rentaldapp.bookingservice.model.entity.Reservation;
import com.rentaldapp.bookingservice.model.entity.Review;
import com.rentaldapp.bookingservice.model.enums.ReservationStatus;
import com.rentaldapp.bookingservice.repository.RatingRepository;
import com.rentaldapp.bookingservice.repository.ReservationRepository;
import com.rentaldapp.bookingservice.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private RatingRepository ratingRepository;

    @Autowired
    private ReservationRepository reservationRepository;

    @Transactional
    public ReviewDTO createReview(ReviewDTO reviewDTO, Integer userId) {
        // Vérifier que la réservation existe
        Reservation reservation = reservationRepository.findById(reviewDTO.getReservationId())
                .orElseThrow(() -> new ReservationNotFoundException("Réservation non trouvée"));

        // Vérifier que c'est l'utilisateur qui a fait la réservation
        if (!reservation.getUserId().equals(userId)) {
            throw new InvalidBookingException("Vous ne pouvez évaluer que vos propres réservations");
        }

        // Vérifier que la réservation est terminée
        if (reservation.getStatus() != ReservationStatus.COMPLETED) {
            throw new InvalidBookingException("Vous ne pouvez évaluer qu'une réservation terminée");
        }

        // Vérifier qu'un avis n'existe pas déjà
        if (reviewRepository.existsByReservationId(reviewDTO.getReservationId())) {
            throw new InvalidBookingException("Un avis existe déjà pour cette réservation");
        }

        // Créer la note
        Rating rating = new Rating();
        rating.setReservationId(reviewDTO.getReservationId());
        rating.setRatingValue(reviewDTO.getRatingValue());
        ratingRepository.save(rating);

        // Créer l'avis
        Review review = new Review();
        review.setReservationId(reviewDTO.getReservationId());
        review.setReviewText(reviewDTO.getReviewText());
        review.setIsVisible(true);

        Review savedReview = reviewRepository.save(review);

        // TODO: Enregistrer le hash de l'avis sur la blockchain

        return convertToDTO(savedReview, rating);
    }

    @Transactional(readOnly = true)
    public ReviewDTO getReviewByReservationId(Integer reservationId) {
        Review review = reviewRepository.findByReservationId(reservationId)
                .orElseThrow(() -> new RuntimeException("Avis non trouvé pour cette réservation"));

        Rating rating = ratingRepository.findByReservationId(reservationId)
                .orElseThrow(() -> new RuntimeException("Note non trouvée pour cette réservation"));

        return convertToDTO(review, rating);
    }

    @Transactional(readOnly = true)
    public List<ReviewDTO> getReviewsByPropertyId(Integer propertyId) {
        List<Review> reviews = reviewRepository.findVisibleReviewsByPropertyId(propertyId);

        return reviews.stream()
                .map(review -> {
                    Rating rating = ratingRepository.findByReservationId(review.getReservationId())
                            .orElse(null);
                    return convertToDTO(review, rating);
                })
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Double getAverageRatingByPropertyId(Integer propertyId) {
        Double average = ratingRepository.findAverageRatingByPropertyId(propertyId);
        return average != null ? average : 0.0;
    }

    @Transactional(readOnly = true)
    public Long getTotalReviewsCountByPropertyId(Integer propertyId) {
        return ratingRepository.countRatingsByPropertyId(propertyId);
    }

    @Transactional
    public ReviewDTO updateReviewVisibility(Integer reviewId, Boolean isVisible) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("Avis non trouvé"));

        review.setIsVisible(isVisible);
        Review updated = reviewRepository.save(review);

        Rating rating = ratingRepository.findByReservationId(review.getReservationId())
                .orElse(null);

        return convertToDTO(updated, rating);
    }

    private ReviewDTO convertToDTO(Review review, Rating rating) {
        ReviewDTO dto = new ReviewDTO();
        dto.setId(review.getId());
        dto.setReservationId(review.getReservationId());
        dto.setReviewText(review.getReviewText());
        dto.setIsVisible(review.getIsVisible());
        dto.setCreatedAt(review.getCreatedAt());

        if (rating != null) {
            dto.setRatingValue(rating.getRatingValue());
        }

        return dto;
    }
}