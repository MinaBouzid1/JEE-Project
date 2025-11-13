package com.rentaldapp.bookingservice.repository;

import com.rentaldapp.bookingservice.model.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Integer> {

    List<Message> findByConversationIdOrderByCreatedAtAsc(Integer conversationId);

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
}