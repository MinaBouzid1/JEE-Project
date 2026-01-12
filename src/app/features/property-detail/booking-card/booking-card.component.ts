// src/app/features/property-detail/booking-card/booking-card.component.ts

import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil, combineLatest, filter, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';

// Material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Models
import { PropertyDetail } from '../../../core/models/property-detail.model';
import { CreateBookingDTO } from '../../../core/models/booking.model';
import { User } from '../../../core/models/user.model';

// Store
import * as BookingActions from '../../../store/booking/booking.actions';
import * as PaymentActions from '../../../store/payment/payment.actions';
import {
  selectBookingLoading,
  selectCurrentBooking,
  selectBookingError
} from '../../../store/booking/booking.selectors';
import {
  selectIsWalletConnected,
  selectWalletAddress,
  selectPaymentLoading
} from '../../../store/payment/payment.selectors';
import { selectCurrentUser } from '../../../store/auth/auth.selectors';

// Components
import { PaymentModalComponent } from '../payment-modal/payment-modal.component';



import * as ListingsActions from '../../../store/listings/listing.actions';  // ✅ CHANGÉ
import {
  selectPropertyBlockedDates,  // ✅ CHANGÉ
  selectListingsLoading         // ✅ CHANGÉ
} from '../../../store/listings/listing.selectors';
import {MatCheckbox} from "@angular/material/checkbox";

/**
 * ============================
 * BOOKING CARD COMPONENT
 * ============================
 */
@Component({
  selector: 'app-booking-card',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatCheckbox,

  ],
  templateUrl: './booking-card.component.html',
  styleUrl: './booking-card.component.scss'
})
export class BookingCardComponent implements OnInit, OnDestroy {

  @Input() property!: PropertyDetail;
  @Input() propertyId!: number;

  // Form
  bookingForm!: FormGroup;

  // User
  currentUser: User | null = null;
  isWalletConnected = false;
  walletAddress: string | null = null;

  // Disponibilité
  blockedDates: Set<string> = new Set();

  // Prix
  totalNights = 0;
  baseAmount = 0;
  cleaningFee = 0;
  petFee = 0;
  serviceFee = 0;
  totalAmount = 0;

  // UI State
  loading = false;
  error: string | null = null;

  // Date limits
  minDate = new Date();
  maxDate = new Date(new Date().setMonth(new Date().getMonth() + 12));

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.subscribeToStore();
    this.loadBlockedDates();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * ============================
   * INITIALISATION
   * ============================
   */
  private initForm(): void {
    this.bookingForm = this.fb.group({
      checkIn: [null, Validators.required],
      checkOut: [null, Validators.required],
      numGuests: [1, [Validators.required, Validators.min(1), Validators.max(this.property.maxGuests)]],
      hasPets: [false]
    });

    // Recalculer le prix quand les dates changent
    this.bookingForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.calculatePrice();
      });
  }

  /**
   * ============================
   * SOUSCRIPTIONS AU STORE
   * ============================
   */
  private subscribeToStore(): void {
    // User
    this.store.select(selectCurrentUser)
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => this.currentUser = user);

    // Wallet
    combineLatest([
      this.store.select(selectIsWalletConnected),
      this.store.select(selectWalletAddress)
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([connected, address]) => {
        this.isWalletConnected = connected;
        this.walletAddress = address;
      });

    // ✅ CHANGÉ - Blocked dates depuis Listings
    this.store.select(selectPropertyBlockedDates)
      .pipe(takeUntil(this.destroy$))
      .subscribe(dates => {
        this.blockedDates = new Set(dates);
        console.log('📅 Blocked dates loaded from Property Service:', dates.length);
      });

    // ✅ CHANGÉ - Loading states
    combineLatest([
      this.store.select(selectListingsLoading),  // Au lieu de selectBookingLoading
      this.store.select(selectPaymentLoading)
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([listingsLoading, paymentLoading]) => {
        this.loading = listingsLoading || paymentLoading;
      });

    // Booking error (reste inchangé)
    this.store.select(selectBookingError)
      .pipe(
        takeUntil(this.destroy$),
        filter(error => error !== null)
      )
      .subscribe(error => {
        this.error = error;
        console.error('❌ Booking error:', error);
      });
  }

  /**
   * ============================
   * CHARGER LES DATES BLOQUÉES
   * ✅ CHANGÉ - Appelle Property Service via Listings
   * ============================
   */
  private loadBlockedDates(): void {
    console.log('🔍 Loading blocked dates from Property Service for property:', this.propertyId);

    // Calculer la plage de dates (aujourd'hui + 1 an)
    const today = new Date();

    const oneYearLater = new Date();
    oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);

    const start = this.formatDate(today);
    const end = this.formatDate(oneYearLater);

    // ✅ DISPATCH vers Listings au lieu de Booking
    this.store.dispatch(ListingsActions.loadPropertyBlockedDates({
      propertyId: this.propertyId,
      start,
      end
    }));
  }
  /**
   * ============================
   * FILTRE DE DATES (CALENDRIER)
   * ============================
   */
  dateFilter = (date: Date | null): boolean => {
    if (!date) return false;

    // Ne pas autoriser les dates passées
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return false;

    // Bloquer les dates déjà réservées
    const dateStr = this.formatDate(date);
    if (this.blockedDates.has(dateStr)) {
      return false;
    }

    return true;
  };

  /**
   * ============================
   * FILTRE CHECK-OUT
   * ============================
   */
  checkOutFilter = (date: Date | null): boolean => {
    if (!date) return false;

    const checkIn = this.bookingForm.get('checkIn')?.value;
    if (!checkIn) return this.dateFilter(date);

    const checkInDate = new Date(checkIn);
    const diffTime = date.getTime() - checkInDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Min stay
    if (this.property.minStayNights && diffDays < this.property.minStayNights) {
      return false;
    }

    // Max stay
    if (this.property.maxStayNights && diffDays > this.property.maxStayNights) {
      return false;
    }

    // Vérifier qu'il n'y a pas de dates bloquées entre check-in et check-out
    const current = new Date(checkInDate);
    while (current < date) {
      const dateStr = this.formatDate(current);
      if (this.blockedDates.has(dateStr)) {
        return false;
      }
      current.setDate(current.getDate() + 1);
    }

    return this.dateFilter(date);
  };

  /**
   * ============================
   * CALCULER LE PRIX
   * ============================
   */
  private calculatePrice(): void {
    const checkIn = this.bookingForm.get('checkIn')?.value;
    const checkOut = this.bookingForm.get('checkOut')?.value;
    const hasPets = this.bookingForm.get('hasPets')?.value;

    if (!checkIn || !checkOut) {
      this.resetPrice();
      return;
    }

    // Calculer nombre de nuits
    const diffTime = checkOut.getTime() - checkIn.getTime();
    this.totalNights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (this.totalNights <= 0) {
      this.resetPrice();
      return;
    }

    // Base amount
    this.baseAmount = this.property.pricePerNight * this.totalNights;

    // Cleaning fee
    this.cleaningFee = this.property.cleaningFee || 0;

    // Pet fee
    this.petFee = hasPets && this.property.petFee ? this.property.petFee : 0;

    // Service fee (10%)
    this.serviceFee = (this.baseAmount + this.cleaningFee + this.petFee) * 0.10;

    // Total
    this.totalAmount = this.baseAmount + this.cleaningFee + this.petFee + this.serviceFee;

    console.log('💰 Price calculated:', {
      nights: this.totalNights,
      base: this.baseAmount,
      total: this.totalAmount
    });
  }

  private resetPrice(): void {
    this.totalNights = 0;
    this.baseAmount = 0;
    this.cleaningFee = 0;
    this.petFee = 0;
    this.serviceFee = 0;
    this.totalAmount = 0;
  }

  /**
   * ============================
   * RÉSERVER
   * ============================
   */
  onReserve(): void {
    const checkIn = this.bookingForm.get('checkIn')?.value;
    const checkOut = this.bookingForm.get('checkOut')?.value;
    const numGuests = this.bookingForm.get('numGuests')?.value;
    const hasPets = this.bookingForm.get('hasPets')?.value;

    if (!checkIn || !checkOut) {
      console.error('❌ Dates manquantes');
      this.error = 'Veuillez sélectionner les dates de check-in et check-out';
      return;
    }

    if (!this.currentUser) {
      console.log('⚠️ User not authenticated, redirecting to login');
      this.router.navigate(['login'], {
        queryParams: { returnUrl: this.router.url }
      });
      return;
    }

    console.log('📝 Creating booking...');

    const createBookingDTO: CreateBookingDTO = {
      propertyId: this.propertyId,
      checkInDate: this.toLocalDateTime(checkIn),      // ✅ Format correct
      checkOutDate: this.toLocalDateTimeCheckOut(checkOut),  // ✅ Format correct
      numGuests: numGuests,
      hasPets: hasPets || false
    };

    console.log('📤 Sending booking:', createBookingDTO);  // ✅ Debug

    this.store.dispatch(BookingActions.createBooking({
      booking: createBookingDTO
    }));

    // ... reste du code
  }
  /**
   * ============================
   * OUVRIR MODAL DE PAIEMENT
   * ============================
   */
  private openPaymentModal(): void {
    const dialogRef = this.dialog.open(PaymentModalComponent, {
      width: '600px',
      disableClose: true,
      data: {
        property: this.property,
        totalAmount: this.totalAmount,
        totalNights: this.totalNights,
        checkIn: this.bookingForm.get('checkIn')?.value,
        checkOut: this.bookingForm.get('checkOut')?.value,
        numGuests: this.bookingForm.get('numGuests')?.value
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.success) {
        console.log('✅ Paiement réussi!');
        this.router.navigate(['/bookings/my-bookings']);
      } else if (result?.cancelled) {
        console.log('❌ Paiement annulé');
        // TODO: Annuler la réservation PENDING
      }
    });
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

  /**
   * Convertir une Date en format LocalDateTime pour le backend
   * Format attendu: "2025-01-15T14:00:00" (sans Z, sans millisecondes)
   */
  private toLocalDateTime(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    // Utiliser les heures de check-in/check-out de la propriété
    // Par défaut: check-in à 14:00, check-out à 11:00
    return `${year}-${month}-${day}T14:00:00`;
  }

  /**
   * Convertir pour check-out (heure différente)
   */
  private toLocalDateTimeCheckOut(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}T11:00:00`;
  }
  /**
   * ============================
   * GETTERS POUR LE TEMPLATE
   * ============================
   */
  get hasMinStay(): boolean {
    return !!this.property.minStayNights && this.property.minStayNights > 1;
  }

  get hasMaxStay(): boolean {
    return !!this.property.maxStayNights;
  }

  get canReserve(): boolean {
    return this.bookingForm.valid &&
      this.totalAmount > 0 &&
      !this.loading;
  }

  get isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  get pricePerNight(): number {
    return this.property.pricePerNight;
  }

  get hasWeekendPrice(): boolean {
    return !!this.property.weekendPricePerNight &&
      this.property.weekendPricePerNight !== this.property.pricePerNight;
  }

  get weekendPrice(): number | null {
    return this.property.weekendPricePerNight || null;
  }
}
