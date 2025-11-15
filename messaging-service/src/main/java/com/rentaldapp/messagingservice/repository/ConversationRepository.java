package com.rentaldapp.messagingservice.repository;

import com.rentaldapp.messagingservice.model.entity.Conversation;
import com.rentaldapp.messagingservice.model.enums.ConversationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ConversationRepository extends JpaRepository<Conversation, Integer> {

    Optional<Conversation> findByReservationId(Integer reservationId);

    boolean existsByReservationId(Integer reservationId);

    List<Conversation> findByStatus(ConversationStatus status);

    // Trouver les conversations expirées à archiver
    @Query("SELECT c FROM Conversation c WHERE c.status = 'ACTIVE' " +
            "AND c.expiresAt < :now")
    List<Conversation> findExpiredConversations(@Param("now") LocalDateTime now);

    // Trouver toutes les conversations d'un utilisateur
    @Query("SELECT DISTINCT c FROM Conversation c " +
            "JOIN ConversationParticipant cp ON c.id = cp.conversationId " +
            "WHERE cp.userId = :userId " +
            "ORDER BY c.createdAt DESC")
    List<Conversation> findUserConversations(@Param("userId") Integer userId);

    // Trouver les conversations actives d'un utilisateur
    @Query("SELECT DISTINCT c FROM Conversation c " +
            "JOIN ConversationParticipant cp ON c.id = cp.conversationId " +
            "WHERE cp.userId = :userId AND c.status = 'ACTIVE' " +
            "ORDER BY c.createdAt DESC")
    List<Conversation> findActiveUserConversations(@Param("userId") Integer userId);
}