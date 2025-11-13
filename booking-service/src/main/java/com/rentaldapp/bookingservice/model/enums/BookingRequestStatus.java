package com.rentaldapp.bookingservice.model.enums;

public enum BookingRequestStatus {
    PENDING,           // En attente de réponse du propriétaire
    ACCEPTED,          // Acceptée par le propriétaire
    DECLINED,          // Refusée
    EXPIRED,           // Expirée
    CANCELLED         // Annulée par le locataire
}