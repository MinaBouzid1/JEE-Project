package com.rentaldapp.bookingservice.service;


import com.rentaldapp.bookingservice.model.dto.PriceBreakdownDTO;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Service
public class PriceCalculationService {

    private static final Double PLATFORM_FEE_PERCENTAGE = 5.00;
    private static final Double SERVICE_FEE_PERCENTAGE = 10.00;

    public PriceBreakdownDTO calculatePrice(
            LocalDateTime checkInDate,
            LocalDateTime checkOutDate,
            Double pricePerNight,
            Double weeklyPrice,
            Double monthlyPrice,
            Double cleaningFee,
            Double petFee,
            Double discountPercentage
    ) {
        // Calculer le nombre de nuits
        long totalNights = ChronoUnit.DAYS.between(checkInDate, checkOutDate);

        if (totalNights <= 0) {
            throw new IllegalArgumentException("La date de départ doit être après la date d'arrivée");
        }

        // Calcul du montant de base
        Double baseAmount = calculateBaseAmount(
                totalNights, pricePerNight, weeklyPrice, monthlyPrice
        );

        // Calcul de la réduction
        Double discountAmount = 0.0;
        if (discountPercentage != null && discountPercentage > 0) {
            discountAmount = baseAmount * (discountPercentage / 100);
        }

        // Montant après réduction
        Double amountAfterDiscount = baseAmount - discountAmount;

        // Frais de service (10% du montant après réduction)
        Double serviceFee = amountAfterDiscount * (SERVICE_FEE_PERCENTAGE / 100);

        // Frais de nettoyage (avec valeur par défaut si null)
        Double cleaningFeeValue = cleaningFee != null ? cleaningFee : 0.0;

        // Frais pour animaux (avec valeur par défaut si null)
        Double petFeeValue = petFee != null ? petFee : 0.0;

        // Montant total
        Double totalAmount = amountAfterDiscount + cleaningFeeValue + petFeeValue + serviceFee;

        return new PriceBreakdownDTO(
                pricePerNight,
                baseAmount,
                discountAmount,
                cleaningFeeValue,
                petFeeValue,
                serviceFee,
                totalAmount,
                PLATFORM_FEE_PERCENTAGE
        );
    }

    private Double calculateBaseAmount(
            long totalNights,
            Double pricePerNight,
            Double weeklyPrice,
            Double monthlyPrice
    ) {
        Double baseAmount = 0.0;

        // Si séjour >= 30 jours et prix mensuel défini
        if (totalNights >= 30 && monthlyPrice != null && monthlyPrice > 0) {
            long months = totalNights / 30;
            long remainingNights = totalNights % 30;

            baseAmount = monthlyPrice * months;
            baseAmount += pricePerNight * remainingNights;
        }
        // Si séjour >= 7 jours et prix hebdomadaire défini
        else if (totalNights >= 7 && weeklyPrice != null && weeklyPrice > 0) {
            long weeks = totalNights / 7;
            long remainingNights = totalNights % 7;

            baseAmount = weeklyPrice * weeks;
            baseAmount += pricePerNight * remainingNights;
        }
        // Sinon, calcul par nuit
        else {
            baseAmount = pricePerNight * totalNights;
        }

        return Math.round(baseAmount * 100.0) / 100.0; // Arrondi à 2 décimales
    }
}