package com.rentaldapp.bookingservice.model.enums;

public enum ReservationStatus {
    PENDING,           // En attente de paiement
    CONFIRMED,         // Confirmée et payée
    CHECKED_IN,        // Client arrivé
    COMPLETED,         // Séjour terminé
    CANCELLED,         // Annulée
    REFUNDED          // Remboursée
}