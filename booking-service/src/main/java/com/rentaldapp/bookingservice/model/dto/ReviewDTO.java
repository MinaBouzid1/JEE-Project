package com.rentaldapp.bookingservice.model.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class ReviewDTO {
    private Integer id;
    private Integer reservationId;

    @NotNull(message = "La note est obligatoire")
    @DecimalMin(value = "1.0", message = "La note minimale est 1.0")
    @DecimalMax(value = "5.0", message = "La note maximale est 5.0")
    private Double ratingValue;

    @NotBlank(message = "Le commentaire est obligatoire")
    @Size(min = 10, max = 2000, message = "Le commentaire doit contenir entre 10 et 2000 caractères")
    private String reviewText;

    private Boolean isVisible;
    private LocalDateTime createdAt;
}