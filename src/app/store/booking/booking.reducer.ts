// src/app/store/booking/booking.reducer.ts

import { createReducer, on } from '@ngrx/store';
import * as BookingActions from './booking.actions';
import { Booking } from '../../core/models/booking.model';

/**
 * ============================
 * ÉTAT BOOKING
 * ============================
 */
export interface BookingState {
  // Listes de réservations
  myBookings: Booking[];              // Toutes mes réservations
  upcomingBookings: Booking[];        // Réservations à venir
  pastBookings: Booking[];            // Réservations passées
  propertyBookings: Booking[];        // Réservations d'une propriété spécifique

  // Réservation courante
  selectedBooking: Booking | null;    // Réservation sélectionnée
  currentBooking: Booking | null;     // Réservation en cours de création

  // Disponibilité
  isAvailable: boolean | null;        // Résultat de vérification de disponibilité
  blockedDates: string[];             // Dates bloquées pour le calendrier

  // État UI
  loading: boolean;
  error: string | null;
}

/**
 * ============================
 * ÉTAT INITIAL
 * ============================
 */
export const initialState: BookingState = {
  myBookings: [],
  upcomingBookings: [],
  pastBookings: [],
  propertyBookings: [],
  selectedBooking: null,
  currentBooking: null,
  isAvailable: null,
  blockedDates: [],
  loading: false,
  error: null
};

/**
 * ============================
 * REDUCER
 * ============================
 */
export const bookingReducer = createReducer(
  initialState,

  // ========================================
  // CRÉATION DE RÉSERVATION
  // ========================================

  on(BookingActions.createBooking, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(BookingActions.createBookingSuccess, (state, { booking }) => ({
    ...state,
    currentBooking: booking,
    myBookings: [booking, ...state.myBookings],
    loading: false
  })),

  on(BookingActions.createBookingFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // ========================================
  // RÉCUPÉRATION - MES RÉSERVATIONS
  // ========================================

  on(BookingActions.loadMyBookings, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(BookingActions.loadMyBookingsSuccess, (state, { bookings }) => ({
    ...state,
    myBookings: bookings,
    loading: false
  })),

  on(BookingActions.loadMyBookingsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // ========================================
  // RÉCUPÉRATION - RÉSERVATIONS À VENIR
  // ========================================

  on(BookingActions.loadUpcomingBookings, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(BookingActions.loadUpcomingBookingsSuccess, (state, { bookings }) => ({
    ...state,
    upcomingBookings: bookings,
    loading: false
  })),

  on(BookingActions.loadUpcomingBookingsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // ========================================
  // RÉCUPÉRATION - RÉSERVATIONS PASSÉES
  // ========================================

  on(BookingActions.loadPastBookings, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(BookingActions.loadPastBookingsSuccess, (state, { bookings }) => ({
    ...state,
    pastBookings: bookings,
    loading: false
  })),

  on(BookingActions.loadPastBookingsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // ========================================
  // RÉCUPÉRATION - PAR ID
  // ========================================

  on(BookingActions.loadBookingById, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(BookingActions.loadBookingByIdSuccess, (state, { booking }) => ({
    ...state,
    selectedBooking: booking,
    loading: false
  })),

  on(BookingActions.loadBookingByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // ========================================
  // RÉCUPÉRATION - RÉSERVATIONS D'UNE PROPRIÉTÉ
  // ========================================

  on(BookingActions.loadPropertyBookings, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(BookingActions.loadPropertyBookingsSuccess, (state, { bookings }) => ({
    ...state,
    propertyBookings: bookings,
    loading: false
  })),

  on(BookingActions.loadPropertyBookingsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // ========================================
  // CONFIRMATION
  // ========================================

  on(BookingActions.confirmBooking, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(BookingActions.confirmBookingSuccess, (state, { booking }) => ({
    ...state,
    currentBooking: booking,
    selectedBooking: booking,
    myBookings: state.myBookings.map(b => b.id === booking.id ? booking : b),
    loading: false
  })),

  on(BookingActions.confirmBookingFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // ========================================
  // CHECK-IN
  // ========================================

  on(BookingActions.checkIn, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(BookingActions.checkInSuccess, (state, { booking }) => ({
    ...state,
    selectedBooking: booking,
    myBookings: state.myBookings.map(b => b.id === booking.id ? booking : b),
    upcomingBookings: state.upcomingBookings.map(b => b.id === booking.id ? booking : b),
    loading: false
  })),

  on(BookingActions.checkInFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // ========================================
  // CHECK-OUT
  // ========================================

  on(BookingActions.checkOut, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(BookingActions.checkOutSuccess, (state, { booking }) => ({
    ...state,
    selectedBooking: booking,
    myBookings: state.myBookings.map(b => b.id === booking.id ? booking : b),
    loading: false
  })),

  on(BookingActions.checkOutFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // ========================================
  // ANNULATION
  // ========================================

  on(BookingActions.cancelBooking, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(BookingActions.cancelBookingSuccess, (state, { booking }) => ({
    ...state,
    selectedBooking: booking,
    myBookings: state.myBookings.map(b => b.id === booking.id ? booking : b),
    upcomingBookings: state.upcomingBookings.filter(b => b.id !== booking.id),
    loading: false
  })),

  on(BookingActions.cancelBookingFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // ========================================
  // ESCROW
  // ========================================

  on(BookingActions.releaseEscrow, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(BookingActions.releaseEscrowSuccess, (state, { booking }) => ({
    ...state,
    selectedBooking: booking,
    myBookings: state.myBookings.map(b => b.id === booking.id ? booking : b),
    loading: false
  })),

  on(BookingActions.releaseEscrowFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // ========================================
  // DISPONIBILITÉ
  // ========================================

  on(BookingActions.checkAvailability, (state) => ({
    ...state,
    loading: true,
    error: null,
    isAvailable: null
  })),

  on(BookingActions.checkAvailabilitySuccess, (state, { available }) => ({
    ...state,
    isAvailable: available,
    loading: false
  })),

  on(BookingActions.checkAvailabilityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // ========================================
  // DATES BLOQUÉES
  // ========================================

  on(BookingActions.loadBlockedDates, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(BookingActions.loadBlockedDatesSuccess, (state, { blockedDates }) => ({
    ...state,
    blockedDates,
    loading: false
  })),

  on(BookingActions.loadBlockedDatesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // ========================================
  // SÉLECTION
  // ========================================

  on(BookingActions.selectBooking, (state, { booking }) => ({
    ...state,
    selectedBooking: booking
  })),

  on(BookingActions.clearSelectedBooking, (state) => ({
    ...state,
    selectedBooking: null
  })),

  // ========================================
  // RESET
  // ========================================

  on(BookingActions.resetBookingState, () => initialState),

  on(BookingActions.clearBookingError, (state) => ({
    ...state,
    error: null
  }))
);
