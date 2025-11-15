package com.rentaldapp.messagingservice.model.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MessageDTO {
    private Integer id;
    private Integer conversationId;
    private Integer senderId;
    private String messageText;
    private Boolean isRead;
    private LocalDateTime readAt;
    private LocalDateTime createdAt;
}