package com.rentaldapp.messagingservice.model.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class SendMessageDTO {

    @NotNull(message = "L'ID de la conversation est obligatoire")
    private Integer conversationId;

    @NotBlank(message = "Le message ne peut pas être vide")
    @Size(max = 5000, message = "Le message ne peut pas dépasser 5000 caractères")
    private String messageText;
}