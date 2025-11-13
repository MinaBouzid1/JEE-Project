package com.rentaldapp.bookingservice.repository;

import com.rentaldapp.bookingservice.model.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.Optional;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Integer> {

    Optional<Rating> findByReservationId(Integer reservationId);

    boolean existsByReservationId(Integer reservationId);

    // Moyenne des notes pour une propriété
    @Query("SELECT AVG(r.ratingValue) FROM Rating r " +
            "JOIN Reservation res ON r.reservationId = res.id " +
            "WHERE res.propertyId = :propertyId")
    Double findAverageRatingByPropertyId(@Param("propertyId") Integer propertyId);

    // Nombre total d'avis pour une propriété
    @Query("SELECT COUNT(r) FROM Rating r " +
            "JOIN Reservation res ON r.reservationId = res.id " +
            "WHERE res.propertyId = :propertyId")
    Long countRatingsByPropertyId(@Param("propertyId") Integer propertyId);
}