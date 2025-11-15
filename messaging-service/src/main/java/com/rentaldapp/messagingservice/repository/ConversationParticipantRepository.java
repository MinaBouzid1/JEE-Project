package com.rentaldapp.messagingservice.repository;

import com.rentaldapp.messagingservice.model.entity.ConversationParticipant;
import com.rentaldapp.messagingservice.model.enums.ParticipantRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ConversationParticipantRepository extends JpaRepository<ConversationParticipant, Integer> {

    List<ConversationParticipant> findByConversationId(Integer conversationId);

    List<ConversationParticipant> findByUserId(Integer userId);

    Optional<ConversationParticipant> findByConversationIdAndUserId(Integer conversationId, Integer userId);

    boolean existsByConversationIdAndUserId(Integer conversationId, Integer userId);

    // Trouver l'autre participant (pas l'utilisateur actuel)
    @Query("SELECT cp FROM ConversationParticipant cp " +
            "WHERE cp.conversationId = :conversationId " +
            "AND cp.userId != :userId")
    Optional<ConversationParticipant> findOtherParticipant(
            @Param("conversationId") Integer conversationId,
            @Param("userId") Integer userId
    );

    // Trouver par rôle
    @Query("SELECT cp FROM ConversationParticipant cp " +
            "WHERE cp.conversationId = :conversationId " +
            "AND cp.role = :role")
    Optional<ConversationParticipant> findByConversationIdAndRole(
            @Param("conversationId") Integer conversationId,
            @Param("role") ParticipantRole role
    );
}