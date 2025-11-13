package com.rentaldapp.bookingservice.service;

import com.rentaldapp.bookingservice.exception.ReservationNotFoundException;
import com.rentaldapp.bookingservice.model.dto.ConversationDTO;
import com.rentaldapp.bookingservice.model.dto.MessageDTO;
import com.rentaldapp.bookingservice.model.entity.Conversation;
import com.rentaldapp.bookingservice.model.entity.Message;
import com.rentaldapp.bookingservice.model.entity.Reservation;
import com.rentaldapp.bookingservice.repository.ConversationRepository;
import com.rentaldapp.bookingservice.repository.MessageRepository;
import com.rentaldapp.bookingservice.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ConversationService {

    @Autowired
    private ConversationRepository conversationRepository;

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private ReservationRepository reservationRepository;

    @Transactional
    public ConversationDTO createConversation(Integer reservationId) {
        // Vérifier que la réservation existe
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new ReservationNotFoundException("Réservation non trouvée"));

        // Vérifier qu'une conversation n'existe pas déjà
        if (conversationRepository.existsByReservationId(reservationId)) {
            throw new RuntimeException("Une conversation existe déjà pour cette réservation");
        }

        // Créer la conversation
        Conversation conversation = new Conversation();
        conversation.setReservationId(reservationId);
        conversation.setStatus("ACTIVE");

        // Expiration : 90 jours après check-out (CORRIGÉ)
        LocalDateTime expiresAt = reservation.getCheckOutDate().plusDays(90).withHour(0).withMinute(0).withSecond(0).withNano(0);
        conversation.setExpiresAt(expiresAt);

        Conversation saved = conversationRepository.save(conversation);

        return convertToDTO(saved);
    }

    // ... le reste du code reste inchangé
    @Transactional(readOnly = true)
    public ConversationDTO getConversationByReservationId(Integer reservationId) {
        Conversation conversation = conversationRepository.findByReservationId(reservationId)
                .orElseThrow(() -> new RuntimeException("Conversation non trouvée"));

        return convertToDTO(conversation);
    }

    @Transactional
    public MessageDTO sendMessage(Integer conversationId, MessageDTO messageDTO, Integer senderId) {
        // Vérifier que la conversation existe
        Conversation conversation = conversationRepository.findById(conversationId)
                .orElseThrow(() -> new RuntimeException("Conversation non trouvée"));

        // Vérifier que la conversation est active
        if (!"ACTIVE".equals(conversation.getStatus())) {
            throw new RuntimeException("La conversation n'est plus active");
        }

        // Créer le message
        Message message = new Message();
        message.setConversationId(conversationId);
        message.setSenderId(senderId);
        message.setMessageText(messageDTO.getMessageText());
        message.setIsRead(false);

        Message saved = messageRepository.save(message);

        return convertMessageToDTO(saved);
    }

    @Transactional(readOnly = true)
    public List<MessageDTO> getConversationMessages(Integer conversationId) {
        return messageRepository.findByConversationIdOrderByCreatedAtAsc(conversationId).stream()
                .map(this::convertMessageToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public void markMessagesAsRead(Integer conversationId, Integer userId) {
        List<Message> unreadMessages = messageRepository.findUnreadMessages(conversationId, userId);

        for (Message message : unreadMessages) {
            message.setIsRead(true);
            message.setReadAt(LocalDateTime.now());
            messageRepository.save(message);
        }
    }

    @Transactional(readOnly = true)
    public Long getUnreadMessageCount(Integer conversationId, Integer userId) {
        return messageRepository.countUnreadMessages(conversationId, userId);
    }

    private ConversationDTO convertToDTO(Conversation conversation) {
        ConversationDTO dto = new ConversationDTO();
        dto.setId(conversation.getId());
        dto.setReservationId(conversation.getReservationId());
        dto.setStatus(conversation.getStatus());
        dto.setCreatedAt(conversation.getCreatedAt());
        dto.setExpiresAt(conversation.getExpiresAt());

        // Charger les messages
        List<MessageDTO> messages = getConversationMessages(conversation.getId());
        dto.setMessages(messages);

        return dto;
    }

    private MessageDTO convertMessageToDTO(Message message) {
        MessageDTO dto = new MessageDTO();
        dto.setId(message.getId());
        dto.setConversationId(message.getConversationId());
        dto.setSenderId(message.getSenderId());
        dto.setMessageText(message.getMessageText());
        dto.setIsRead(message.getIsRead());
        dto.setReadAt(message.getReadAt());
        dto.setCreatedAt(message.getCreatedAt());
        return dto;
    }
}