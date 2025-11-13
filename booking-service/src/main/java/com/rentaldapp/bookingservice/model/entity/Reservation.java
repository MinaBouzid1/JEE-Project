package com.rentaldapp.bookingservice.model.entity;

import com.rentaldapp.bookingservice.model.enums.ReservationStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "reservations")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "property_id", nullable = false)
    private Integer propertyId;

    // ✅ NOUVEAU : Ajout de version_id
    @Column(name = "version_id")
    private Integer versionId;

    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Column(name = "check_in_date", nullable = false)
    private LocalDateTime checkInDate;

    @Column(name = "check_out_date", nullable = false)
    private LocalDateTime checkOutDate;

    @Column(name = "total_nights", nullable = false)
    private Integer totalNights;

    @Column(name = "num_guests", nullable = false)
    private Integer numGuests;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private ReservationStatus status = ReservationStatus.PENDING;

    @Column(name = "cancelled_at")
    private LocalDateTime cancelledAt;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "locked_price_per_night", nullable = false, columnDefinition = "DOUBLE")
    private Double lockedPricePerNight;

    @Column(name = "base_amount", nullable = false, columnDefinition = "DOUBLE")
    private Double baseAmount;

    @Column(name = "discount_amount", columnDefinition = "DOUBLE")
    private Double discountAmount;

    @Column(name = "cleaning_fee", columnDefinition = "DOUBLE")
    private Double cleaningFee;

    @Column(name = "pet_fee", columnDefinition = "DOUBLE")
    private Double petFee;

    @Column(name = "service_fee", nullable = false, columnDefinition = "DOUBLE")
    private Double serviceFee;

    @Column(name = "total_amount", nullable = false, columnDefinition = "DOUBLE")
    private Double totalAmount;

    @Column(name = "platform_fee_percentage", columnDefinition = "DOUBLE")
    private Double platformFeePercentage = 5.00;


    @Column(name = "blockchain_tx_hash", length = 255)
    private String blockchainTxHash;

    @Column(name = "escrow_released", columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean escrowReleased = false;

    @Column(name = "escrow_release_tx_hash", length = 255)
    private String escrowReleaseTxHash;
}