package com.rentaldapp.bookingservice.model.dto;

import jakarta.validation.constraints.*;
import lombok.Data;


import java.time.LocalDateTime;

@Data
public class CreateBookingDTO {

    @NotNull(message = "L'ID de la propriété est obligatoire")
    private Integer propertyId;

    // ✅ NOUVEAU : Version ID (optionnel, sera calculé automatiquement si null)
    private Integer versionId;

    @NotNull(message = "La date d'arrivée est obligatoire")
    @Future(message = "La date d'arrivée doit être dans le futur")
    private LocalDateTime checkInDate;

    @NotNull(message = "La date de départ est obligatoire")
    @Future(message = "La date de départ doit être dans le futur")
    private LocalDateTime checkOutDate;

    @NotNull(message = "Le nombre de voyageurs est obligatoire")
    @Min(value = 1, message = "Au moins 1 voyageur requis")
    @Max(value = 50, message = "Maximum 50 voyageurs")
    private Integer numGuests;

    private Boolean hasPets = false;

    private String specialRequests;
}