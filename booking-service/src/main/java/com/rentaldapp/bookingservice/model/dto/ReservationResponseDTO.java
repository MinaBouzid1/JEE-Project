package com.rentaldapp.bookingservice.model.dto;

import com.rentaldapp.bookingservice.model.enums.ReservationStatus;
import lombok.Data;


import java.time.LocalDateTime;

@Data
public class ReservationResponseDTO {
    private Integer id;
    private Integer propertyId;

    // ✅ NOUVEAU : Version ID
    private Integer versionId;

    private Integer userId;
    private LocalDateTime checkInDate;
    private LocalDateTime checkOutDate;
    private Integer totalNights;
    private Integer numGuests;
    private ReservationStatus status;
    private LocalDateTime cancelledAt;
    private LocalDateTime createdAt;

    // Prix
    private PriceBreakdownDTO priceBreakdown;

    // Blockchain
    private String blockchainTxHash;
    private Boolean escrowReleased;
    private String escrowReleaseTxHash;
}