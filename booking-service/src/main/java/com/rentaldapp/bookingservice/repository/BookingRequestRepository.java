package com.rentaldapp.bookingservice.repository;

import com.rentaldapp.bookingservice.model.entity.BookingRequest;
import com.rentaldapp.bookingservice.model.enums.BookingRequestStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BookingRequestRepository extends JpaRepository<BookingRequest, Integer> {

    List<BookingRequest> findByUserId(Integer userId);

    List<BookingRequest> findByPropertyId(Integer propertyId);

    List<BookingRequest> findByStatus(BookingRequestStatus status);

    // Demandes en attente pour une propriété
    @Query("SELECT br FROM BookingRequest br WHERE br.propertyId = :propertyId " +
            "AND br.status = 'PENDING' " +
            "ORDER BY br.createdAt ASC")
    List<BookingRequest> findPendingRequestsByProperty(@Param("propertyId") Integer propertyId);

    // Demandes expirées à mettre à jour
    @Query("SELECT br FROM BookingRequest br WHERE br.status = 'PENDING' " +
            "AND br.expiresAt < :now")
    List<BookingRequest> findExpiredRequests(@Param("now") LocalDateTime now);
}