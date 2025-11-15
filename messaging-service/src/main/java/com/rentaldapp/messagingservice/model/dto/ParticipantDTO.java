package com.rentaldapp.messagingservice.model.dto;

import com.rentaldapp.messagingservice.model.enums.ParticipantRole;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ParticipantDTO {
    private Integer userId;
    private ParticipantRole role;
    private LocalDateTime lastReadAt;
    private LocalDateTime joinedAt;
}