package com.rentaldapp.messagingservice.repository;

import com.rentaldapp.messagingservice.model.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface MessageRepository extends JpaRepository<Message, Integer> {

    List<Message> findByConversationIdOrderByCreatedAtAsc(Integer conversationId);

    List<Message> findByConversationIdOrderByCreatedAtDesc(Integer conversationId);

    List<Message> findBySenderIdOrderByCreatedAtDesc(Integer senderId);

    // Messages non lus pour un destinataire
    @Query("SELECT m FROM Message m WHERE m.conversationId = :conversationId " +
            "AND m.senderId != :userId " +
            "AND m.isRead = false " +
            "ORDER BY m.createdAt ASC")
    List<Message> findUnreadMessages(
            @Param("conversationId") Integer conversationId,
            @Param("userId") Integer userId
    );

    // Compter les messages non lus
    @Query("SELECT COUNT(m) FROM Message m WHERE m.conversationId = :conversationId " +
            "AND m.senderId != :userId " +
            "AND m.isRead = false")
    Long countUnreadMessages(
            @Param("conversationId") Integer conversationId,
            @Param("userId") Integer userId
    );

    // Dernier message d'une conversation
    @Query("SELECT m FROM Message m WHERE m.conversationId = :conversationId " +
            "ORDER BY m.createdAt DESC LIMIT 1")
    Optional<Message> findLastMessage(@Param("conversationId") Integer conversationId);

    // Marquer tous les messages d'une conversation comme lus
    @Modifying
    @Query("UPDATE Message m SET m.isRead = true, m.readAt = :readAt " +
            "WHERE m.conversationId = :conversationId " +
            "AND m.senderId != :userId " +
            "AND m.isRead = false")
    int markAllAsRead(
            @Param("conversationId") Integer conversationId,
            @Param("userId") Integer userId,
            @Param("readAt") LocalDateTime readAt
    );

    // Messages d'une conversation depuis une date
    @Query("SELECT m FROM Message m WHERE m.conversationId = :conversationId " +
            "AND m.createdAt > :since " +
            "ORDER BY m.createdAt ASC")
    List<Message> findMessagesSince(
            @Param("conversationId") Integer conversationId,
            @Param("since") LocalDateTime since
    );

    // Compter le nombre total de messages d'une conversation
    Long countByConversationId(Integer conversationId);
}