// src/app/store/booking/booking.selectors.ts

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookingState } from './booking.reducer';
import { Booking, ReservationStatus } from '../../core/models/booking.model';

/**
 * ============================
 * BOOKING SELECTORS
 * Sélecteurs pour accéder à l'état des réservations
 * ============================
 */

// Sélecteur de feature
export const selectBookingState = createFeatureSelector<BookingState>('booking');

// ========================================
// SÉLECTEURS DE BASE
// ========================================

/**
 * Toutes les réservations de l'utilisateur
 */
export const selectMyBookings = createSelector(
  selectBookingState,
  (state: BookingState) => state.myBookings
);

/**
 * Réservations à venir
 */
export const selectUpcomingBookings = createSelector(
  selectBookingState,
  (state: BookingState) => state.upcomingBookings
);

/**
 * Réservations passées
 */
export const selectPastBookings = createSelector(
  selectBookingState,
  (state: BookingState) => state.pastBookings
);

/**
 * Réservations d'une propriété
 */
export const selectPropertyBookings = createSelector(
  selectBookingState,
  (state: BookingState) => state.propertyBookings
);

/**
 * Réservation sélectionnée
 */
export const selectSelectedBooking = createSelector(
  selectBookingState,
  (state: BookingState) => state.selectedBooking
);

/**
 * Réservation en cours de création
 */
export const selectCurrentBooking = createSelector(
  selectBookingState,
  (state: BookingState) => state.currentBooking
);

// ========================================
// DISPONIBILITÉ
// ========================================

/**
 * Résultat de vérification de disponibilité
 */
export const selectIsAvailable = createSelector(
  selectBookingState,
  (state: BookingState) => state.isAvailable
);

/**
 * Dates bloquées pour le calendrier
 */
export const selectBlockedDates = createSelector(
  selectBookingState,
  (state: BookingState) => state.blockedDates
);

// ========================================
// ÉTAT UI
// ========================================

/**
 * État de chargement
 */
export const selectBookingLoading = createSelector(
  selectBookingState,
  (state: BookingState) => state.loading
);

/**
 * Erreur
 */
export const selectBookingError = createSelector(
  selectBookingState,
  (state: BookingState) => state.error
);

// ========================================
// SÉLECTEURS DÉRIVÉS (COMPUTED)
// ========================================

/**
 * Nombre total de réservations
 */
export const selectTotalBookingsCount = createSelector(
  selectMyBookings,
  (bookings: Booking[]) => bookings.length
);

/**
 * Nombre de réservations à venir
 */
export const selectUpcomingBookingsCount = createSelector(
  selectUpcomingBookings,
  (bookings: Booking[]) => bookings.length
);

/**
 * Nombre de réservations passées
 */
export const selectPastBookingsCount = createSelector(
  selectPastBookings,
  (bookings: Booking[]) => bookings.length
);

/**
 * Réservations PENDING (en attente de paiement)
 */
export const selectPendingBookings = createSelector(
  selectMyBookings,
  (bookings: Booking[]) =>
    bookings.filter(b => b.status === ReservationStatus.PENDING)
);

/**
 * Réservations CONFIRMED (confirmées)
 */
export const selectConfirmedBookings = createSelector(
  selectMyBookings,
  (bookings: Booking[]) =>
    bookings.filter(b => b.status === ReservationStatus.CONFIRMED)
);

/**
 * Réservations en cours (CHECKED_IN)
 */
export const selectActiveBookings = createSelector(
  selectMyBookings,
  (bookings: Booking[]) =>
    bookings.filter(b => b.status === ReservationStatus.CHECKED_IN)
);

/**
 * Réservations annulées
 */
export const selectCancelledBookings = createSelector(
  selectMyBookings,
  (bookings: Booking[]) =>
    bookings.filter(b => b.status === ReservationStatus.CANCELLED)
);

/**
 * Réservations terminées
 */
export const selectCompletedBookings = createSelector(
  selectMyBookings,
  (bookings: Booking[]) =>
    bookings.filter(b => b.status === ReservationStatus.COMPLETED)
);

/**
 * Montant total dépensé (réservations confirmées et terminées)
 */
export const selectTotalSpent = createSelector(
  selectMyBookings,
  (bookings: Booking[]) =>
    bookings
      .filter(b =>
        b.status === ReservationStatus.CONFIRMED ||
        b.status === ReservationStatus.COMPLETED ||
        b.status === ReservationStatus.CHECKED_IN
      )
      .reduce((total, booking) => total + booking.priceBreakdown.totalAmount, 0)
);

/**
 * Prochaine réservation à venir
 */
export const selectNextBooking = createSelector(
  selectUpcomingBookings,
  (bookings: Booking[]) => {
    if (bookings.length === 0) return null;

    // Trier par date de check-in
    const sorted = [...bookings].sort((a, b) =>
      new Date(a.checkInDate).getTime() - new Date(b.checkInDate).getTime()
    );

    return sorted[0];
  }
);

/**
 * Dernière réservation passée
 */
export const selectLastCompletedBooking = createSelector(
  selectPastBookings,
  (bookings: Booking[]) => {
    if (bookings.length === 0) return null;

    // Trier par date de check-out décroissante
    const sorted = [...bookings].sort((a, b) =>
      new Date(b.checkOutDate).getTime() - new Date(a.checkOutDate).getTime()
    );

    return sorted[0];
  }
);

/**
 * Vérifier si une propriété a déjà été réservée par l'utilisateur
 */
export const selectHasBookedProperty = (propertyId: number) =>
  createSelector(
    selectMyBookings,
    (bookings: Booking[]) =>
      bookings.some(b => b.propertyId === propertyId)
  );

/**
 * Réservations pour une propriété spécifique
 */
export const selectBookingsByPropertyId = (propertyId: number) =>
  createSelector(
    selectMyBookings,
    (bookings: Booking[]) =>
      bookings.filter(b => b.propertyId === propertyId)
  );

/**
 * Vérifier si une réservation existe par ID
 */
export const selectBookingById = (bookingId: number) =>
  createSelector(
    selectMyBookings,
    (bookings: Booking[]) =>
      bookings.find(b => b.id === bookingId)
  );

/**
 * Statistiques des réservations
 */
export const selectBookingStats = createSelector(
  selectMyBookings,
  (bookings: Booking[]) => {
    const stats = {
      total: bookings.length,
      pending: 0,
      confirmed: 0,
      active: 0,
      completed: 0,
      cancelled: 0,
      totalSpent: 0,
      averageNights: 0,
      totalNights: 0
    };

    bookings.forEach(booking => {
      switch (booking.status) {
        case ReservationStatus.PENDING:
          stats.pending++;
          break;
        case ReservationStatus.CONFIRMED:
          stats.confirmed++;
          stats.totalSpent += booking.priceBreakdown.totalAmount;
          break;
        case ReservationStatus.CHECKED_IN:
          stats.active++;
          stats.totalSpent += booking.priceBreakdown.totalAmount;
          break;
        case ReservationStatus.COMPLETED:
          stats.completed++;
          stats.totalSpent += booking.priceBreakdown.totalAmount;
          break;
        case ReservationStatus.CANCELLED:
          stats.cancelled++;
          break;
      }

      stats.totalNights += booking.totalNights;
    });

    if (bookings.length > 0) {
      stats.averageNights = stats.totalNights / bookings.length;
    }

    return stats;
  }
);

/**
 * Vérifier si des réservations sont en cours de chargement
 */
export const selectIsLoadingBookings = createSelector(
  selectBookingLoading,
  (loading: boolean) => loading
);

/**
 * Vérifier si une erreur existe
 */
export const selectHasBookingError = createSelector(
  selectBookingError,
  (error: string | null) => error !== null
);

/**
 * Calendrier : dates disponibles pour une propriété
 * Retourne un Set de dates au format 'YYYY-MM-DD' qui sont BLOQUÉES
 */
export const selectBlockedDatesSet = createSelector(
  selectBlockedDates,
  (dates: string[]) => new Set(dates)
);

/**
 * Vérifier si l'utilisateur a une réservation active
 */
export const selectHasActiveBooking = createSelector(
  selectActiveBookings,
  (bookings: Booking[]) => bookings.length > 0
);

/**
 * Réservations modifiables (PENDING ou CONFIRMED)
 */
export const selectModifiableBookings = createSelector(
  selectMyBookings,
  (bookings: Booking[]) =>
    bookings.filter(b =>
      b.status === ReservationStatus.PENDING ||
      b.status === ReservationStatus.CONFIRMED
    )
);

/**
 * Réservations annulables
 */
export const selectCancellableBookings = createSelector(
  selectMyBookings,
  (bookings: Booking[]) =>
    bookings.filter(b =>
      b.status !== ReservationStatus.COMPLETED &&
      b.status !== ReservationStatus.CANCELLED &&
      b.status !== ReservationStatus.REFUNDED
    )
);
