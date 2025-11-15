package com.rentaldapp.messagingservice.service;

import com.rentaldapp.messagingservice.exception.ConversationNotFoundException;
import com.rentaldapp.messagingservice.exception.UnauthorizedAccessException;
import com.rentaldapp.messagingservice.model.dto.*;
import com.rentaldapp.messagingservice.model.entity.Conversation;
import com.rentaldapp.messagingservice.model.entity.ConversationParticipant;
import com.rentaldapp.messagingservice.model.entity.Message;
import com.rentaldapp.messagingservice.model.enums.ConversationStatus;
import com.rentaldapp.messagingservice.model.enums.ParticipantRole;
import com.rentaldapp.messagingservice.repository.ConversationParticipantRepository;
import com.rentaldapp.messagingservice.repository.ConversationRepository;
import com.rentaldapp.messagingservice.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ConversationService {

    @Autowired
    private ConversationRepository conversationRepository;

    @Autowired
    private ConversationParticipantRepository participantRepository;

    @Autowired
    private MessageRepository messageRepository;

    @Transactional
    public ConversationDTO createConversation(Integer reservationId, Integer tenantId, Integer hostId) {
        // Vérifier qu'une conversation n'existe pas déjà
        if (conversationRepository.existsByReservationId(reservationId)) {
            throw new RuntimeException("Une conversation existe déjà pour cette réservation");
        }

        // Créer la conversation
        Conversation conversation = new Conversation();
        conversation.setReservationId(reservationId);
        conversation.setStatus(ConversationStatus.ACTIVE);

        // Expiration : 90 jours après la date actuelle (à ajuster selon la date de check-out)
        LocalDateTime expiresAt = LocalDateTime.now().plusDays(90);
        conversation.setExpiresAt(expiresAt);

        Conversation savedConversation = conversationRepository.save(conversation);

        // Ajouter les participants (locataire et propriétaire)
        ConversationParticipant tenant = new ConversationParticipant();
        tenant.setConversationId(savedConversation.getId());
        tenant.setUserId(tenantId);
        tenant.setRole(ParticipantRole.TENANT);
        participantRepository.save(tenant);

        ConversationParticipant host = new ConversationParticipant();
        host.setConversationId(savedConversation.getId());
        host.setUserId(hostId);
        host.setRole(ParticipantRole.HOST);
        participantRepository.save(host);

        return convertToDTO(savedConversation, null);
    }

    @Transactional(readOnly = true)
    public ConversationDTO getConversationById(Integer conversationId, Integer userId) {
        Conversation conversation = conversationRepository.findById(conversationId)
                .orElseThrow(() -> new ConversationNotFoundException("Conversation non trouvée"));

        // Vérifier que l'utilisateur est participant
        if (!isParticipant(conversationId, userId)) {
            throw new UnauthorizedAccessException("Vous n'avez pas accès à cette conversation");
        }

        return convertToDTO(conversation, userId);
    }

    @Transactional(readOnly = true)
    public ConversationDTO getConversationByReservationId(Integer reservationId, Integer userId) {
        Conversation conversation = conversationRepository.findByReservationId(reservationId)
                .orElseThrow(() -> new ConversationNotFoundException("Conversation non trouvée pour cette réservation"));

        // Vérifier que l'utilisateur est participant
        if (!isParticipant(conversation.getId(), userId)) {
            throw new UnauthorizedAccessException("Vous n'avez pas accès à cette conversation");
        }

        return convertToDTO(conversation, userId);
    }

    @Transactional(readOnly = true)
    public List<ConversationSummaryDTO> getUserConversations(Integer userId) {
        List<Conversation> conversations = conversationRepository.findActiveUserConversations(userId);

        return conversations.stream()
                .map(conv -> convertToSummaryDTO(conv, userId))
                .collect(Collectors.toList());
    }

    @Transactional
    public ConversationDTO archiveConversation(Integer conversationId, Integer userId) {
        Conversation conversation = conversationRepository.findById(conversationId)
                .orElseThrow(() -> new ConversationNotFoundException("Conversation non trouvée"));

        // Vérifier que l'utilisateur est participant
        if (!isParticipant(conversationId, userId)) {
            throw new UnauthorizedAccessException("Vous n'avez pas accès à cette conversation");
        }

        conversation.setStatus(ConversationStatus.ARCHIVED);
        Conversation updated = conversationRepository.save(conversation);

        return convertToDTO(updated, userId);
    }

    @Transactional
    public void expireOldConversations() {
        List<Conversation> expiredConversations = conversationRepository.findExpiredConversations(LocalDateTime.now());

        for (Conversation conversation : expiredConversations) {
            conversation.setStatus(ConversationStatus.EXPIRED);
            conversationRepository.save(conversation);
        }
    }

    @Transactional(readOnly = true)
    public Long getUnreadCount(Integer conversationId, Integer userId) {
        return messageRepository.countUnreadMessages(conversationId, userId);
    }

    @Transactional(readOnly = true)
    public boolean isParticipant(Integer conversationId, Integer userId) {
        return participantRepository.existsByConversationIdAndUserId(conversationId, userId);
    }

    private ConversationDTO convertToDTO(Conversation conversation, Integer currentUserId) {
        ConversationDTO dto = new ConversationDTO();
        dto.setId(conversation.getId());
        dto.setReservationId(conversation.getReservationId());
        dto.setStatus(conversation.getStatus());
        dto.setCreatedAt(conversation.getCreatedAt());
        dto.setExpiresAt(conversation.getExpiresAt());

        // Charger les participants
        List<ConversationParticipant> participants = participantRepository.findByConversationId(conversation.getId());
        List<ParticipantDTO> participantDTOs = participants.stream()
                .map(this::convertParticipantToDTO)
                .collect(Collectors.toList());
        dto.setParticipants(participantDTOs);

        // Charger le dernier message
        messageRepository.findLastMessage(conversation.getId())
                .ifPresent(message -> dto.setLastMessage(convertMessageToDTO(message)));

        // Compter les messages non lus (si currentUserId fourni)
        if (currentUserId != null) {
            Long unreadCount = messageRepository.countUnreadMessages(conversation.getId(), currentUserId);
            dto.setUnreadCount(unreadCount);
        }

        return dto;
    }

    private ConversationSummaryDTO convertToSummaryDTO(Conversation conversation, Integer currentUserId) {
        ConversationSummaryDTO dto = new ConversationSummaryDTO();
        dto.setId(conversation.getId());
        dto.setReservationId(conversation.getReservationId());
        dto.setStatus(conversation.getStatus());

        // Trouver l'autre participant
        ConversationParticipant otherParticipant = participantRepository
                .findOtherParticipant(conversation.getId(), currentUserId)
                .orElse(null);

        if (otherParticipant != null) {
            dto.setOtherParticipantId(otherParticipant.getUserId());
            // TODO: Récupérer le nom via User Service (Feign Client)
            dto.setOtherParticipantName("Utilisateur " + otherParticipant.getUserId());
        }

        // Dernier message
        messageRepository.findLastMessage(conversation.getId())
                .ifPresent(message -> {
                    dto.setLastMessage(convertMessageToDTO(message));
                    dto.setLastActivity(message.getCreatedAt());
                });

        // Messages non lus
        Long unreadCount = messageRepository.countUnreadMessages(conversation.getId(), currentUserId);
        dto.setUnreadCount(unreadCount);

        return dto;
    }

    private ParticipantDTO convertParticipantToDTO(ConversationParticipant participant) {
        ParticipantDTO dto = new ParticipantDTO();
        dto.setUserId(participant.getUserId());
        dto.setRole(participant.getRole());
        dto.setLastReadAt(participant.getLastReadAt());
        dto.setJoinedAt(participant.getJoinedAt());
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