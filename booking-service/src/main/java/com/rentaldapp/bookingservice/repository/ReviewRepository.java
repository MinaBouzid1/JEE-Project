package com.rentaldapp.bookingservice.repository;

import com.rentaldapp.bookingservice.model.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer> {

    Optional<Review> findByReservationId(Integer reservationId);

    boolean existsByReservationId(Integer reservationId);

    List<Review> findByIsVisible(Boolean isVisible);

    // Avis pour une propriété
    @Query("SELECT rev FROM Review rev " +
            "JOIN Reservation res ON rev.reservationId = res.id " +
            "WHERE res.propertyId = :propertyId " +
            "AND rev.isVisible = true " +
            "ORDER BY rev.createdAt DESC")
    List<Review> findVisibleReviewsByPropertyId(@Param("propertyId") Integer propertyId);
}