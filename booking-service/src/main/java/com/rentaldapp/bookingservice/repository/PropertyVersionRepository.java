package com.rentaldapp.bookingservice.repository;

import com.rentaldapp.bookingservice.model.entity.PropertyVersion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface PropertyVersionRepository extends JpaRepository<PropertyVersion, Integer> {

    List<PropertyVersion> findByPropertyIdOrderByNumVersionDesc(Integer propertyId);

    Optional<PropertyVersion> findByPropertyIdAndNumVersion(Integer propertyId, Integer numVersion);

    // Récupérer la dernière version d'une propriété
    @Query("SELECT pv FROM PropertyVersion pv WHERE pv.propertyId = :propertyId " +
            "ORDER BY pv.numVersion DESC LIMIT 1")
    Optional<PropertyVersion> findLatestVersionByPropertyId(@Param("propertyId") Integer propertyId);

    // Récupérer la version active au moment d'une date donnée
    @Query("SELECT pv FROM PropertyVersion pv WHERE pv.propertyId = :propertyId " +
            "AND pv.createdAt <= :date ORDER BY pv.createdAt DESC LIMIT 1")
    Optional<PropertyVersion> findVersionAtDate(
            @Param("propertyId") Integer propertyId,
            @Param("date") LocalDateTime date
    );
}