// src/app/store/booking/booking.effects.ts

import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, exhaustMap, tap } from 'rxjs/operators';
import { BookingService } from '../../core/services/booking.service';
import * as BookingActions from './booking.actions';

/**
 * ============================
 * BOOKING EFFECTS
 * Gère tous les side effects (appels API) pour les réservations
 * ============================
 */
@Injectable()
export class BookingEffects {

  private actions$ = inject(Actions);
  private bookingService = inject(BookingService);

  // ========================================
  // CRÉATION DE RÉSERVATION
  // ========================================

  createBooking$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookingActions.createBooking),
      tap(action => console.log('🔥 Effect: createBooking', action)),
      exhaustMap(({ createBookingDTO }) =>
        this.bookingService.createBooking(createBookingDTO).pipe(
          map(booking => {
            console.log('✅ Booking created:', booking);
            return BookingActions.createBookingSuccess({ booking });
          }),
          catchError(error => {
            console.error('❌ Error creating booking:', error);
            return of(BookingActions.createBookingFailure({
              error: error.message || 'Erreur lors de la création de la réservation'
            }));
          })
        )
      )
    )
  );

  // ========================================
  // RÉCUPÉRATION DE RÉSERVATIONS
  // ========================================

  loadMyBookings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookingActions.loadMyBookings),
      tap(() => console.log('🔥 Effect: loadMyBookings')),
      exhaustMap(() =>
        this.bookingService.getMyBookings().pipe(
          map(bookings => {
            console.log('✅ My bookings loaded:', bookings.length);
            return BookingActions.loadMyBookingsSuccess({ bookings });
          }),
          catchError(error => {
            console.error('❌ Error loading my bookings:', error);
            return of(BookingActions.loadMyBookingsFailure({
              error: error.message || 'Erreur lors du chargement des réservations'
            }));
          })
        )
      )
    )
  );

  loadUpcomingBookings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookingActions.loadUpcomingBookings),
      tap(() => console.log('🔥 Effect: loadUpcomingBookings')),
      exhaustMap(() =>
        this.bookingService.getUpcomingBookings().pipe(
          map(bookings => {
            console.log('✅ Upcoming bookings loaded:', bookings.length);
            return BookingActions.loadUpcomingBookingsSuccess({ bookings });
          }),
          catchError(error => {
            console.error('❌ Error loading upcoming bookings:', error);
            return of(BookingActions.loadUpcomingBookingsFailure({
              error: error.message || 'Erreur lors du chargement des réservations à venir'
            }));
          })
        )
      )
    )
  );

  loadPastBookings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookingActions.loadPastBookings),
      tap(() => console.log('🔥 Effect: loadPastBookings')),
      exhaustMap(() =>
        this.bookingService.getPastBookings().pipe(
          map(bookings => {
            console.log('✅ Past bookings loaded:', bookings.length);
            return BookingActions.loadPastBookingsSuccess({ bookings });
          }),
          catchError(error => {
            console.error('❌ Error loading past bookings:', error);
            return of(BookingActions.loadPastBookingsFailure({
              error: error.message || 'Erreur lors du chargement des réservations passées'
            }));
          })
        )
      )
    )
  );

  loadBookingById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookingActions.loadBookingById),
      tap(action => console.log('🔥 Effect: loadBookingById', action.id)),
      exhaustMap(({ id }) =>
        this.bookingService.getBookingById(id).pipe(
          map(booking => {
            console.log('✅ Booking loaded:', booking);
            return BookingActions.loadBookingByIdSuccess({ booking });
          }),
          catchError(error => {
            console.error('❌ Error loading booking:', error);
            return of(BookingActions.loadBookingByIdFailure({
              error: error.message || 'Erreur lors du chargement de la réservation'
            }));
          })
        )
      )
    )
  );

  loadPropertyBookings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookingActions.loadPropertyBookings),
      tap(action => console.log('🔥 Effect: loadPropertyBookings', action.propertyId)),
      exhaustMap(({ propertyId }) =>
        this.bookingService.getPropertyBookings(propertyId).pipe(
          map(bookings => {
            console.log('✅ Property bookings loaded:', bookings.length);
            return BookingActions.loadPropertyBookingsSuccess({ bookings });
          }),
          catchError(error => {
            console.error('❌ Error loading property bookings:', error);
            return of(BookingActions.loadPropertyBookingsFailure({
              error: error.message || 'Erreur lors du chargement des réservations de la propriété'
            }));
          })
        )
      )
    )
  );

  // ========================================
  // CONFIRMATION
  // ========================================

  confirmBooking$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookingActions.confirmBooking),
      tap(action => console.log('🔥 Effect: confirmBooking', action)),
      exhaustMap(({ id, blockchainTxHash }) =>
        this.bookingService.confirmBooking(id, blockchainTxHash).pipe(
          map(booking => {
            console.log('✅ Booking confirmed:', booking);
            return BookingActions.confirmBookingSuccess({ booking });
          }),
          catchError(error => {
            console.error('❌ Error confirming booking:', error);
            return of(BookingActions.confirmBookingFailure({
              error: error.message || 'Erreur lors de la confirmation'
            }));
          })
        )
      )
    )
  );

  // ========================================
  // CHECK-IN / CHECK-OUT
  // ========================================

  checkIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookingActions.checkIn),
      tap(action => console.log('🔥 Effect: checkIn', action.id)),
      exhaustMap(({ id }) =>
        this.bookingService.checkIn(id).pipe(
          map(booking => {
            console.log('✅ Check-in successful:', booking);
            return BookingActions.checkInSuccess({ booking });
          }),
          catchError(error => {
            console.error('❌ Error during check-in:', error);
            return of(BookingActions.checkInFailure({
              error: error.message || 'Erreur lors du check-in'
            }));
          })
        )
      )
    )
  );

  checkOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookingActions.checkOut),
      tap(action => console.log('🔥 Effect: checkOut', action.id)),
      exhaustMap(({ id }) =>
        this.bookingService.checkOut(id).pipe(
          map(booking => {
            console.log('✅ Check-out successful:', booking);
            return BookingActions.checkOutSuccess({ booking });
          }),
          catchError(error => {
            console.error('❌ Error during check-out:', error);
            return of(BookingActions.checkOutFailure({
              error: error.message || 'Erreur lors du check-out'
            }));
          })
        )
      )
    )
  );

  // ========================================
  // ANNULATION
  // ========================================

  cancelBooking$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookingActions.cancelBooking),
      tap(action => console.log('🔥 Effect: cancelBooking', action)),
      exhaustMap(({ id, reason }) =>
        this.bookingService.cancelBooking(id, reason || 'Annulé par l\'utilisateur').pipe(
          map(booking => {
            console.log('✅ Booking cancelled:', booking);
            return BookingActions.cancelBookingSuccess({ booking });
          }),
          catchError(error => {
            console.error('❌ Error cancelling booking:', error);
            return of(BookingActions.cancelBookingFailure({
              error: error.message || 'Erreur lors de l\'annulation'
            }));
          })
        )
      )
    )
  );

  // ========================================
  // ESCROW
  // ========================================

  releaseEscrow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookingActions.releaseEscrow),
      tap(action => console.log('🔥 Effect: releaseEscrow', action)),
      exhaustMap(({ id, txHash }) =>
        this.bookingService.releaseEscrow(id, txHash).pipe(
          map(booking => {
            console.log('✅ Escrow released:', booking);
            return BookingActions.releaseEscrowSuccess({ booking });
          }),
          catchError(error => {
            console.error('❌ Error releasing escrow:', error);
            return of(BookingActions.releaseEscrowFailure({
              error: error.message || 'Erreur lors de la libération de l\'escrow'
            }));
          })
        )
      )
    )
  );

  // ========================================
  // DISPONIBILITÉ
  // ========================================

  checkAvailability$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookingActions.checkAvailability),
      tap(action => console.log('🔥 Effect: checkAvailability', action)),
      exhaustMap(({ propertyId, checkIn, checkOut }) =>
        this.bookingService.checkAvailability(
          propertyId,
          new Date(checkIn),
          new Date(checkOut)
        ).pipe(
          map(available => {
            console.log('✅ Availability check:', available);
            return BookingActions.checkAvailabilitySuccess({ available });
          }),
          catchError(error => {
            console.error('❌ Error checking availability:', error);
            return of(BookingActions.checkAvailabilityFailure({
              error: error.message || 'Erreur lors de la vérification de disponibilité'
            }));
          })
        )
      )
    )
  );

  loadBlockedDates$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookingActions.loadBlockedDates),
      tap(action => console.log('🔥 Effect: loadBlockedDates', action.propertyId)),
      exhaustMap(({ propertyId }) =>
        this.bookingService.getBlockedDates(propertyId).pipe(
          map(blockedDates => {
            console.log('✅ Blocked dates loaded:', blockedDates.length);
            return BookingActions.loadBlockedDatesSuccess({ blockedDates });
          }),
          catchError(error => {
            console.error('❌ Error loading blocked dates:', error);
            return of(BookingActions.loadBlockedDatesFailure({
              error: error.message || 'Erreur lors du chargement des dates bloquées'
            }));
          })
        )
      )
    )
  );
}
