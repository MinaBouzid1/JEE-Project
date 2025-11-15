package com.rentaldapp.messagingservice.model.dto;

import com.rentaldapp.messagingservice.model.enums.ConversationStatus;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class ConversationDTO {
    private Integer id;
    private Integer reservationId;
    private ConversationStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime expiresAt;
    private List<ParticipantDTO> participants;
    private MessageDTO lastMessage;
    private Long unreadCount;
}