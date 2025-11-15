package com.rentaldapp.messagingservice.service;

import com.rentaldapp.messagingservice.exception.ConversationNotFoundException;
import com.rentaldapp.messagingservice.exception.UnauthorizedAccessException;
import com.rentaldapp.messagingservice.model.dto.MessageDTO;
import com.rentaldapp.messagingservice.model.dto.SendMessageDTO;
import com.rentaldapp.messagingservice.model.entity.Conversation;
import com.rentaldapp.messagingservice.model.entity.ConversationParticipant;
import com.rentaldapp.messagingservice.model.entity.Message;
import com.rentaldapp.messagingservice.model.enums.ConversationStatus;
import com.rentaldapp.messagingservice.repository.ConversationParticipantRepository;
import com.rentaldapp.messagingservice.repository.ConversationRepository;
import com.rentaldapp.messagingservice.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private ConversationRepository conversationRepository;

    @Autowired
    private ConversationParticipantRepository participantRepository;

    @Transactional
    public MessageDTO sendMessage(SendMessageDTO sendMessageDTO, Integer senderId) {
        // Vérifier que la conversation existe
        Conversation conversation = conversationRepository.findById(sendMessageDTO.getConversationId())
                .orElseThrow(() -> new ConversationNotFoundException("Conversation non trouvée"));

        // Vérifier que la conversation est active
        if (conversation.getStatus() != ConversationStatus.ACTIVE) {
            throw new RuntimeException("La conversation n'est plus active");
        }

        // Vérifier que l'expéditeur est participant
        if (!participantRepository.existsByConversationIdAndUserId(sendMessageDTO.getConversationId(), senderId)) {
            throw new UnauthorizedAccessException("Vous n'êtes pas participant de cette conversation");
        }

        // Créer le message
        Message message = new Message();
        message.setConversationId(sendMessageDTO.getConversationId());
        message.setSenderId(senderId);
        message.setMessageText(sendMessageDTO.getMessageText());
        message.setIsRead(false);

        Message savedMessage = messageRepository.save(message);

        return convertToDTO(savedMessage);
    }

    @Transactional(readOnly = true)
    public List<MessageDTO> getConversationMessages(Integer conversationId, Integer userId) {
        // Vérifier que l'utilisateur est participant
        if (!participantRepository.existsByConversationIdAndUserId(conversationId, userId)) {
            throw new UnauthorizedAccessException("Vous n'avez pas accès à cette conversation");
        }

        List<Message> messages = messageRepository.findByConversationIdOrderByCreatedAtAsc(conversationId);

        return messages.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<MessageDTO> getMessagesSince(Integer conversationId, Integer userId, LocalDateTime since) {
        // Vérifier que l'utilisateur est participant
        if (!participantRepository.existsByConversationIdAndUserId(conversationId, userId)) {
            throw new UnauthorizedAccessException("Vous n'avez pas accès à cette conversation");
        }

        List<Message> messages = messageRepository.findMessagesSince(conversationId, since);

        return messages.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public void markMessagesAsRead(Integer conversationId, Integer userId) {
        // Vérifier que l'utilisateur est participant
        if (!participantRepository.existsByConversationIdAndUserId(conversationId, userId)) {
            throw new UnauthorizedAccessException("Vous n'avez pas accès à cette conversation");
        }

        int updated = messageRepository.markAllAsRead(conversationId, userId, LocalDateTime.now());

        // Mettre à jour le lastReadAt du participant
        ConversationParticipant participant = participantRepository
                .findByConversationIdAndUserId(conversationId, userId)
                .orElseThrow(() -> new RuntimeException("Participant non trouvé"));

        participant.setLastReadAt(LocalDateTime.now());
        participantRepository.save(participant);
    }

    @Transactional(readOnly = true)
    public Long getUnreadCount(Integer conversationId, Integer userId) {
        return messageRepository.countUnreadMessages(conversationId, userId);
    }

    @Transactional(readOnly = true)
    public Long getTotalMessageCount(Integer conversationId, Integer userId) {
        // Vérifier que l'utilisateur est participant
        if (!participantRepository.existsByConversationIdAndUserId(conversationId, userId)) {
            throw new UnauthorizedAccessException("Vous n'avez pas accès à cette conversation");
        }

        return messageRepository.countByConversationId(conversationId);
    }

    private MessageDTO convertToDTO(Message message) {
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