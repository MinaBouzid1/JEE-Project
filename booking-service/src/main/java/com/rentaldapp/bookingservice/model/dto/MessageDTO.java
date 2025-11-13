package com.rentaldapp.bookingservice.model.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MessageDTO {
    private Integer id;
    private Integer conversationId;
    private Integer senderId;

    @NotBlank(message = "Le message ne peut pas être vide")
    private String messageText;

    private Boolean isRead;
    private LocalDateTime readAt;
    private LocalDateTime createdAt;
}