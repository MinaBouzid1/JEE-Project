package com.rentaldapp.bookingservice.controller;

import com.rentaldapp.bookingservice.model.dto.ConversationDTO;
import com.rentaldapp.bookingservice.model.dto.MessageDTO;
import com.rentaldapp.bookingservice.service.ConversationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/conversations")
@CrossOrigin(origins = "*")
public class ConversationController {

    @Autowired
    private ConversationService conversationService;

    @PostMapping
    public ResponseEntity<ConversationDTO> createConversation(@RequestParam Integer reservationId) {
        ConversationDTO conversation = conversationService.createConversation(reservationId);
        return ResponseEntity.status(HttpStatus.CREATED).body(conversation);
    }

    @GetMapping("/reservation/{reservationId}")
    public ResponseEntity<ConversationDTO> getConversationByReservationId(
            @PathVariable Integer reservationId) {
        ConversationDTO conversation = conversationService.getConversationByReservationId(reservationId);
        return ResponseEntity.ok(conversation);
    }

    @PostMapping("/{conversationId}/messages")
    public ResponseEntity<MessageDTO> sendMessage(
            @PathVariable Integer conversationId,
            @Valid @RequestBody MessageDTO messageDTO,
            Authentication authentication) {
        Integer senderId = (Integer) authentication.getPrincipal();
        MessageDTO message = conversationService.sendMessage(conversationId, messageDTO, senderId);
        return ResponseEntity.status(HttpStatus.CREATED).body(message);
    }

    @GetMapping("/{conversationId}/messages")
    public ResponseEntity<List<MessageDTO>> getMessages(@PathVariable Integer conversationId) {
        List<MessageDTO> messages = conversationService.getConversationMessages(conversationId);
        return ResponseEntity.ok(messages);
    }

    @PatchMapping("/{conversationId}/mark-read")
    public ResponseEntity<Map<String, String>> markAsRead(
            @PathVariable Integer conversationId,
            Authentication authentication) {
        Integer userId = (Integer) authentication.getPrincipal();
        conversationService.markMessagesAsRead(conversationId, userId);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Messages marqués comme lus");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{conversationId}/unread-count")
    public ResponseEntity<Map<String, Long>> getUnreadCount(
            @PathVariable Integer conversationId,
            Authentication authentication) {
        Integer userId = (Integer) authentication.getPrincipal();
        Long count = conversationService.getUnreadMessageCount(conversationId, userId);

        Map<String, Long> response = new HashMap<>();
        response.put("unreadCount", count);
        return ResponseEntity.ok(response);
    }
}