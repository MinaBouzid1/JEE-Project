package com.rentaldapp.bookingservice.model.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class ConversationDTO {
    private Integer id;
    private Integer reservationId;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime expiresAt;
    private List<MessageDTO> messages;
}