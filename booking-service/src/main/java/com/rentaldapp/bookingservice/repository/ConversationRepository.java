package com.rentaldapp.bookingservice.repository;

import com.rentaldapp.bookingservice.model.entity.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ConversationRepository extends JpaRepository<Conversation, Integer> {

    Optional<Conversation> findByReservationId(Integer reservationId);

    boolean existsByReservationId(Integer reservationId);
}