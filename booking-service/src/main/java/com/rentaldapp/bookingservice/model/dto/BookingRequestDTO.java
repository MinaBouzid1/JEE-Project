package com.rentaldapp.bookingservice.model.dto;

import com.rentaldapp.bookingservice.model.enums.BookingRequestStatus;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class BookingRequestDTO {
    private Integer id;
    private Integer propertyId;
    private Integer userId;
    private LocalDateTime checkInDate;
    private LocalDateTime checkOutDate;
    private Integer totalNights;
    private Integer numGuests;
    private BookingRequestStatus status;
    private String message;
    private LocalDateTime respondedAt;
    private LocalDateTime acceptedAt;
    private LocalDateTime expiresAt;
    private LocalDateTime cancelledAt;
    private String cancellationReason;
    private LocalDateTime createdAt;
    private Integer reservationId;

    // Prix
    private PriceBreakdownDTO priceBreakdown;
}