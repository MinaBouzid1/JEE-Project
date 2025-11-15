package com.rentaldapp.messagingservice.model.dto;

import com.rentaldapp.messagingservice.model.enums.ConversationStatus;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ConversationSummaryDTO {
    private Integer id;
    private Integer reservationId;
    private ConversationStatus status;
    private Integer otherParticipantId;
    private String otherParticipantName;
    private MessageDTO lastMessage;
    private Long unreadCount;
    private LocalDateTime lastActivity;
}