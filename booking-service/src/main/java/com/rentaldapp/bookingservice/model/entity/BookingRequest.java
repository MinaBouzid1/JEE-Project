package com.rentaldapp.bookingservice.model.entity;

import com.rentaldapp.bookingservice.model.enums.BookingRequestStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "booking_requests")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "property_id", nullable = false)
    private Integer propertyId;

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
    private BookingRequestStatus status = BookingRequestStatus.PENDING;

    @Column(name = "base_amount", nullable = false, columnDefinition = "DOUBLE")
    private Double baseAmount;

    @Column(name = "discount_amount", columnDefinition = "DOUBLE")
    private Double discountAmount = 0.0;

    @Column(name = "cleaning_fee", columnDefinition = "DOUBLE")
    private Double cleaningFee = 0.0;

    @Column(name = "pet_fee", columnDefinition = "DOUBLE")
    private Double petFee = 0.0;

    @Column(name = "service_fee", nullable = false, columnDefinition = "DOUBLE")
    private Double serviceFee;

    @Column(name = "total_amount", nullable = false, columnDefinition = "DOUBLE")
    private Double totalAmount;

    @Column(columnDefinition = "TEXT")
    private String message;

    @Column(name = "responded_at")
    private LocalDateTime respondedAt;

    @Column(name = "accepted_at")
    private LocalDateTime acceptedAt;

    @Column(name = "expires_at", nullable = false)
    private LocalDateTime expiresAt;

    @Column(name = "cancelled_at")
    private LocalDateTime cancelledAt;

    @Column(name = "cancellation_reason", columnDefinition = "TEXT")
    private String cancellationReason;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "reservation_id")
    private Integer reservationId;
}
