package com.rentaldapp.messagingservice.websocket;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rentaldapp.messagingservice.model.dto.MessageDTO;
import com.rentaldapp.messagingservice.model.dto.SendMessageDTO;
import com.rentaldapp.messagingservice.security.JwtTokenProvider;
import com.rentaldapp.messagingservice.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class MessageWebSocketHandler extends TextWebSocketHandler {

    @Autowired
    private MessageService messageService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    private final ObjectMapper objectMapper = new ObjectMapper();

    // Map pour stocker les sessions actives par utilisateur
    private final Map<Integer, WebSocketSession> userSessions = new ConcurrentHashMap<>();

    // Map pour stocker les utilisateurs par conversation
    private final Map<Integer, Map<Integer, WebSocketSession>> conversationSessions = new ConcurrentHashMap<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        // Extraire le token JWT des paramètres de requête
        String token = extractToken(session);

        if (token != null && jwtTokenProvider.validateToken(token)) {
            Integer userId = jwtTokenProvider.getUserIdFromToken(token);

            // Stocker la session
            userSessions.put(userId, session);
            session.getAttributes().put("userId", userId);

            System.out.println("WebSocket connecté pour l'utilisateur: " + userId);
        } else {
            session.close(CloseStatus.NOT_ACCEPTABLE.withReason("Token invalide"));
        }
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        Integer senderId = (Integer) session.getAttributes().get("userId");

        if (senderId == null) {
            session.close(CloseStatus.NOT_ACCEPTABLE.withReason("Non authentifié"));
            return;
        }

        try {
            // Parser le message JSON
            Map<String, Object> payload = objectMapper.readValue(message.getPayload(), Map.class);
            String action = (String) payload.get("action");

            if ("send_message".equals(action)) {
                // Envoyer un message
                SendMessageDTO sendMessageDTO = new SendMessageDTO();
                sendMessageDTO.setConversationId((Integer) payload.get("conversationId"));
                sendMessageDTO.setMessageText((String) payload.get("messageText"));

                MessageDTO savedMessage = messageService.sendMessage(sendMessageDTO, senderId);

                // Envoyer le message aux participants de la conversation
                broadcastMessage(savedMessage);

            } else if ("mark_read".equals(action)) {
                // Marquer les messages comme lus
                Integer conversationId = (Integer) payload.get("conversationId");
                messageService.markMessagesAsRead(conversationId, senderId);

                // Notifier l'autre participant
                notifyReadReceipt(conversationId, senderId);

            } else if ("join_conversation".equals(action)) {
                // Rejoindre une conversation
                Integer conversationId = (Integer) payload.get("conversationId");
                joinConversation(conversationId, senderId, session);
            }

        } catch (Exception e) {
            // Envoyer une erreur au client
            sendError(session, "Erreur lors du traitement du message: " + e.getMessage());
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        Integer userId = (Integer) session.getAttributes().get("userId");

        if (userId != null) {
            userSessions.remove(userId);

            // Retirer de toutes les conversations
            conversationSessions.values().forEach(map -> map.remove(userId));

            System.out.println("WebSocket déconnecté pour l'utilisateur: " + userId);
        }
    }

    private void joinConversation(Integer conversationId, Integer userId, WebSocketSession session) {
        conversationSessions.computeIfAbsent(conversationId, k -> new ConcurrentHashMap<>())
                .put(userId, session);
    }

    private void broadcastMessage(MessageDTO message) {
        Map<Integer, WebSocketSession> sessions = conversationSessions.get(message.getConversationId());

        if (sessions != null) {
            String messageJson;
            try {
                Map<String, Object> payload = Map.of(
                        "type", "new_message",
                        "data", message
                );
                messageJson = objectMapper.writeValueAsString(payload);
            } catch (Exception e) {
                System.err.println("Erreur lors de la sérialisation du message: " + e.getMessage());
                return;
            }

            sessions.forEach((userId, session) -> {
                if (session.isOpen()) {
                    try {
                        session.sendMessage(new TextMessage(messageJson));
                    } catch (IOException e) {
                        System.err.println("Erreur lors de l'envoi du message à l'utilisateur " + userId + ": " + e.getMessage());
                    }
                }
            });
        }
    }

    private void notifyReadReceipt(Integer conversationId, Integer readerId) {
        Map<Integer, WebSocketSession> sessions = conversationSessions.get(conversationId);

        if (sessions != null) {
            String notificationJson;
            try {
                Map<String, Object> payload = Map.of(
                        "type", "messages_read",
                        "data", Map.of(
                                "conversationId", conversationId,
                                "readerId", readerId
                        )
                );
                notificationJson = objectMapper.writeValueAsString(payload);
            } catch (Exception e) {
                System.err.println("Erreur lors de la sérialisation de la notification: " + e.getMessage());
                return;
            }

            sessions.forEach((userId, session) -> {
                if (!userId.equals(readerId) && session.isOpen()) {
                    try {
                        session.sendMessage(new TextMessage(notificationJson));
                    } catch (IOException e) {
                        System.err.println("Erreur lors de l'envoi de la notification: " + e.getMessage());
                    }
                }
            });
        }
    }

    private void sendError(WebSocketSession session, String errorMessage) {
        try {
            Map<String, Object> payload = Map.of(
                    "type", "error",
                    "message", errorMessage
            );
            String json = objectMapper.writeValueAsString(payload);
            session.sendMessage(new TextMessage(json));
        } catch (IOException e) {
            System.err.println("Erreur lors de l'envoi de l'erreur: " + e.getMessage());
        }
    }

    private String extractToken(WebSocketSession session) {
        String query = session.getUri().getQuery();
        if (query != null && query.contains("token=")) {
            String[] params = query.split("&");
            for (String param : params) {
                if (param.startsWith("token=")) {
                    return param.substring(6);
                }
            }
        }
        return null;
    }
}