package com.rentaldapp.bookingservice.repository;

import com.rentaldapp.bookingservice.model.entity.ReservationStatusHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationStatusHistoryRepository extends JpaRepository<ReservationStatusHistory, Integer> {

    List<ReservationStatusHistory> findByReservationIdOrderByCreatedAtDesc(Integer reservationId);
}