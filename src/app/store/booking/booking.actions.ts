// src/app/store/booking/booking.actions.ts

import { createAction, props } from '@ngrx/store';
import { Booking, CreateBookingDTO } from '../../core/models/booking.model';

/**
 * ============================
 * ACTIONS BOOKING
 * Toutes les actions pour gérer les réservations
 * ============================
 */

// ========================================
// CRÉATION DE RÉSERVATION
// ========================================

/**
 * Créer une nouvelle réservation
 * Flow: createBooking → API → createBookingSuccess OU createBookingFailure
 */
export const createBooking = createAction(
  '[Booking] Create Booking',
  props<{ createBookingDTO: CreateBookingDTO }>()
);

export const createBookingSuccess = createAction(
  '[Booking] Create Booking Success',
  props<{ booking: Booking }>()
);

export const createBookingFailure = createAction(
  '[Booking] Create Booking Failure',
  props<{ error: string }>()
);

// ========================================
// RÉCUPÉRATION DE RÉSERVATIONS
// ========================================

/**
 * Charger toutes les réservations de l'utilisateur
 */
export const loadMyBookings = createAction(
  '[Booking] Load My Bookings'
);

export const loadMyBookingsSuccess = createAction(
  '[Booking] Load My Bookings Success',
  props<{ bookings: Booking[] }>()
);

export const loadMyBookingsFailure = createAction(
  '[Booking] Load My Bookings Failure',
  props<{ error: string }>()
);

/**
 * Charger les réservations à venir
 */
export const loadUpcomingBookings = createAction(
  '[Booking] Load Upcoming Bookings'
);

export const loadUpcomingBookingsSuccess = createAction(
  '[Booking] Load Upcoming Bookings Success',
  props<{ bookings: Booking[] }>()
);

export const loadUpcomingBookingsFailure = createAction(
  '[Booking] Load Upcoming Bookings Failure',
  props<{ error: string }>()
);

/**
 * Charger les réservations passées
 */
export const loadPastBookings = createAction(
  '[Booking] Load Past Bookings'
);

export const loadPastBookingsSuccess = createAction(
  '[Booking] Load Past Bookings Success',
  props<{ bookings: Booking[] }>()
);

export const loadPastBookingsFailure = createAction(
  '[Booking] Load Past Bookings Failure',
  props<{ error: string }>()
);

/**
 * Charger une réservation par ID
 */
export const loadBookingById = createAction(
  '[Booking] Load Booking By ID',
  props<{ id: number }>()
);

export const loadBookingByIdSuccess = createAction(
  '[Booking] Load Booking By ID Success',
  props<{ booking: Booking }>()
);

export const loadBookingByIdFailure = createAction(
  '[Booking] Load Booking By ID Failure',
  props<{ error: string }>()
);

/**
 * Charger les réservations d'une propriété
 * Utilisé pour afficher le calendrier
 */
export const loadPropertyBookings = createAction(
  '[Booking] Load Property Bookings',
  props<{ propertyId: number }>()
);

export const loadPropertyBookingsSuccess = createAction(
  '[Booking] Load Property Bookings Success',
  props<{ bookings: Booking[] }>()
);

export const loadPropertyBookingsFailure = createAction(
  '[Booking] Load Property Bookings Failure',
  props<{ error: string }>()
);

// ========================================
// CONFIRMATION DE RÉSERVATION
// ========================================

/**
 * Confirmer une réservation après paiement
 * Flow:
 * 1. User paie avec MetaMask
 * 2. Frontend dispatch confirmBooking avec txHash
 * 3. Backend change status PENDING → CONFIRMED
 */
export const confirmBooking = createAction(
  '[Booking] Confirm Booking',
  props<{ id: number; blockchainTxHash: string }>()
);

export const confirmBookingSuccess = createAction(
  '[Booking] Confirm Booking Success',
  props<{ booking: Booking }>()
);

export const confirmBookingFailure = createAction(
  '[Booking] Confirm Booking Failure',
  props<{ error: string }>()
);

// ========================================
// CHECK-IN / CHECK-OUT
// ========================================

/**
 * Effectuer le check-in
 * Change status CONFIRMED → CHECKED_IN
 */
export const checkIn = createAction(
  '[Booking] Check In',
  props<{ id: number }>()
);

export const checkInSuccess = createAction(
  '[Booking] Check In Success',
  props<{ booking: Booking }>()
);

export const checkInFailure = createAction(
  '[Booking] Check In Failure',
  props<{ error: string }>()
);

/**
 * Effectuer le check-out
 * Change status CHECKED_IN → COMPLETED
 * Déclenche libération escrow
 */
export const checkOut = createAction(
  '[Booking] Check Out',
  props<{ id: number }>()
);

export const checkOutSuccess = createAction(
  '[Booking] Check Out Success',
  props<{ booking: Booking }>()
);

export const checkOutFailure = createAction(
  '[Booking] Check Out Failure',
  props<{ error: string }>()
);

// ========================================
// ANNULATION
// ========================================

/**
 * Annuler une réservation
 * Change status → CANCELLED
 * Déclenche remboursement
 */
export const cancelBooking = createAction(
  '[Booking] Cancel Booking',
  props<{ id: number; reason?: string }>()
);

export const cancelBookingSuccess = createAction(
  '[Booking] Cancel Booking Success',
  props<{ booking: Booking }>()
);

export const cancelBookingFailure = createAction(
  '[Booking] Cancel Booking Failure',
  props<{ error: string }>()
);

// ========================================
// LIBÉRATION ESCROW
// ========================================

/**
 * Libérer l'escrow au propriétaire
 * Appelé après check-out
 */
export const releaseEscrow = createAction(
  '[Booking] Release Escrow',
  props<{ id: number; txHash: string }>()
);

export const releaseEscrowSuccess = createAction(
  '[Booking] Release Escrow Success',
  props<{ booking: Booking }>()
);

export const releaseEscrowFailure = createAction(
  '[Booking] Release Escrow Failure',
  props<{ error: string }>()
);

// ========================================
// DISPONIBILITÉ
// ========================================

/**
 * Vérifier la disponibilité d'une propriété
 */
export const checkAvailability = createAction(
  '[Booking] Check Availability',
  props<{ propertyId: number; checkIn: string; checkOut: string }>()
);

export const checkAvailabilitySuccess = createAction(
  '[Booking] Check Availability Success',
  props<{ available: boolean }>()
);

export const checkAvailabilityFailure = createAction(
  '[Booking] Check Availability Failure',
  props<{ error: string }>()
);

/**
 * Charger les dates bloquées pour le calendrier
 */
export const loadBlockedDates = createAction(
  '[Booking] Load Blocked Dates',
  props<{ propertyId: number }>()
);

export const loadBlockedDatesSuccess = createAction(
  '[Booking] Load Blocked Dates Success',
  props<{ blockedDates: string[] }>()
);

export const loadBlockedDatesFailure = createAction(
  '[Booking] Load Blocked Dates Failure',
  props<{ error: string }>()
);

// ========================================
// SÉLECTION DE RÉSERVATION COURANTE
// ========================================

/**
 * Sélectionner une réservation pour affichage détaillé
 */
export const selectBooking = createAction(
  '[Booking] Select Booking',
  props<{ booking: Booking }>()
);

/**
 * Désélectionner la réservation courante
 */
export const clearSelectedBooking = createAction(
  '[Booking] Clear Selected Booking'
);

// ========================================
// RESET / CLEAR
// ========================================

/**
 * Réinitialiser l'état booking
 */
export const resetBookingState = createAction(
  '[Booking] Reset State'
);

/**
 * Effacer les erreurs
 */
export const clearBookingError = createAction(
  '[Booking] Clear Error'
);
