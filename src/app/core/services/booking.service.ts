// src/app/core/services/booking.service.ts

import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import {
  Booking,
  CreateBookingDTO,
  ReservationStatus
} from '../models/booking.model';

/**
 * ============================
 * BOOKING SERVICE
 * Gère toutes les interactions avec l'API Booking
 * ============================
 */
@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private apiService = inject(ApiService);

  constructor() {
    console.log('✅ BookingService initialized');
  }

  /**
   * ============================
   * CRÉER UNE RÉSERVATION
   * ============================
   */
  createBooking(booking: CreateBookingDTO): Observable<Booking> {
    console.log('📤 Creating booking:', booking);
    return this.apiService.post<Booking>('/bookings/new', booking);
  }

  /**
   * ============================
   * RÉCUPÉRER MES RÉSERVATIONS
   * ============================
   */
  getMyBookings(): Observable<Booking[]> {
    return this.apiService.get<Booking[]>('/bookings/my-bookings');
  }

  getUpcomingBookings(): Observable<Booking[]> {
    return this.apiService.get<Booking[]>('/bookings/upcoming');
  }

  getPastBookings(): Observable<Booking[]> {
    return this.apiService.get<Booking[]>('/bookings/past');
  }

  /**
   * ============================
   * RÉCUPÉRER UNE RÉSERVATION PAR ID
   * ============================
   */
  getBookingById(id: number): Observable<Booking> {
    return this.apiService.get<Booking>(`/bookings/${id}`);
  }

  /**
   * ============================
   * RÉCUPÉRER LES RÉSERVATIONS D'UNE PROPRIÉTÉ
   * ============================
   */
  getPropertyBookings(propertyId: number): Observable<Booking[]> {
    return this.apiService.get<Booking[]>(`/bookings/property/${propertyId}/bookings`);
  }

  /**
   * ============================
   * CONFIRMER UNE RÉSERVATION
   * ============================
   */
  confirmBooking(id: number, blockchainTxHash: string): Observable<Booking> {
    return this.apiService.patch<Booking>(
      `/bookings/${id}/confirm`,
      { blockchainTxHash }
    );
  }

  /**
   * ============================
   * CHECK-IN
   * ============================
   */
  checkIn(id: number): Observable<Booking> {
    return this.apiService.patch<Booking>(`/bookings/${id}/check-in`, {});
  }

  /**
   * ============================
   * CHECK-OUT
   * ============================
   */
  checkOut(id: number): Observable<Booking> {
    return this.apiService.patch<Booking>(`/bookings/${id}/check-out`, {});
  }

  /**
   * ============================
   * ANNULER UNE RÉSERVATION
   * ============================
   */
  cancelBooking(id: number, reason: string): Observable<Booking> {
    return this.apiService.patch<Booking>(
      `/bookings/${id}/cancel`,
      { reason }
    );
  }

  /**
   * ============================
   * LIBÉRER L'ESCROW
   * ============================
   */
  releaseEscrow(id: number, txHash: string): Observable<Booking> {
    return this.apiService.patch<Booking>(
      `/bookings/${id}/release-escrow`,
      { blockchainTxHash: txHash }
    );
  }

  /**
   * ============================
   * VÉRIFIER LA DISPONIBILITÉ
   * ============================
   */
  checkAvailability(
    propertyId: number,
    checkIn: Date,
    checkOut: Date
  ): Observable<boolean> {
    const params = {
      checkIn: this.formatDate(checkIn),
      checkOut: this.formatDate(checkOut)
    };

    console.log('🔍 Checking availability:', params);

    return this.apiService.get<{ available: boolean }>(
      `/bookings/property/${propertyId}/check-availability`,
      params
    ).pipe(
      map(response => response.available)
    );
  }

  /**
   * ============================
   * RÉCUPÉRER LES DATES BLOQUÉES
   * ============================
   */
  getBlockedDates(propertyId: number): Observable<string[]> {
    console.log('🔍 Fetching blocked dates for property:', propertyId);
    return this.apiService.get<string[]>(`/bookings/property/${propertyId}`);
  }

  /**
   * ============================
   * HELPERS
   * ============================
   */
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
