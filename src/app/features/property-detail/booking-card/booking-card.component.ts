// src/app/features/property-detail/components/booking-card/booking-card.component.ts

import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil, combineLatest } from 'rxjs';
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
  selectBlockedDates,
  selectIsAvailable,
  selectBookingLoading,
  selectCurrentBooking
} from '../../../store/booking/booking.selectors';
import {
  selectIsWalletConnected,
  selectWalletAddress,
  selectHasSufficientBalance,
  selectPaymentLoading
} from '../../../store/payment/payment.selectors';
import { selectCurrentUser } from '../../../store/auth/auth.selectors';

// Components
import { PaymentModalComponent } from '../payment-modal/payment-modal.component';

/**
 * ============================
 * BOOKING CARD COMPONENT
 * Composant de réservation avec :
 * - Calendrier intelligent (dates bloquées, min/max stay)
 * - Calcul de prix en temps réel
 * - Intégration MetaMask
 * - Flow de paiement
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
    MatProgressSpinnerModule
  ],
  templateUrl: './booking-card.component.html',
  styleUrl: './booking-card.component.scss'
})
export class BookingCardComponent implements OnInit, OnDestroy {

  @Input() property!: PropertyDetail;
  @Input() propertyId!: number; // ✅ AJOUTÉ

  // Form
  bookingForm!: FormGroup;

  // User
  currentUser: User | null = null;
  isWalletConnected = false;
  walletAddress: string | null = null;

  // Disponibilité
  blockedDates: Set<string> = new Set();
  isAvailable: boolean | null = null;

  // Prix
  totalNights = 0;
  baseAmount = 0;
  cleaningFee = 0;
  petFee = 0;
  serviceFee = 0; // 10%
  totalAmount = 0;

  // UI State
  loading = false;
  error: string | null = null;

  // Date limits
  minDate = new Date();
  maxDate = new Date(new Date().setMonth(new Date().getMonth() + 12)); // 1 an max

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private dialog: MatDialog
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
   * INITIALISATION DU FORMULAIRE
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
        this.checkAvailability();
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

    // Blocked dates
    this.store.select(selectBlockedDates)
      .pipe(takeUntil(this.destroy$))
      .subscribe(dates => {
        this.blockedDates = new Set(dates);
      });

    // Disponibilité
    this.store.select(selectIsAvailable)
      .pipe(takeUntil(this.destroy$))
      .subscribe(available => {
        this.isAvailable = available;
        if (available === false) {
          this.error = 'Ces dates ne sont pas disponibles';
        } else if (available === true) {
          this.error = null;
        }
      });

    // Loading states
    combineLatest([
      this.store.select(selectBookingLoading),
      this.store.select(selectPaymentLoading)
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([bookingLoading, paymentLoading]) => {
        this.loading = bookingLoading || paymentLoading;
      });
  }

  /**
   * ============================
   * CHARGER LES DATES BLOQUÉES
   * ============================
   */
  private loadBlockedDates(): void {
    this.store.dispatch(BookingActions.loadBlockedDates({
      propertyId: this.propertyId // ✅ CORRIGÉ
    }));
  }

  /**
   * ============================
   * FILTRE DE DATES (CALENDRIER)
   * Bloque les dates non disponibles
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
    if (this.blockedDates.has(dateStr)) return false;

    return true;
  };

  /**
   * ============================
   * FILTRE CHECK-OUT
   * Applique min/max stay + dates bloquées
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
   * VÉRIFIER LA DISPONIBILITÉ
   * ============================
   */
  private checkAvailability(): void {
    const checkIn = this.bookingForm.get('checkIn')?.value;
    const checkOut = this.bookingForm.get('checkOut')?.value;

    if (!checkIn || !checkOut) return;

    this.store.dispatch(BookingActions.checkAvailability({
      propertyId: this.propertyId, // ✅ CORRIGÉ
      checkIn: this.toISOString(checkIn),
      checkOut: this.toISOString(checkOut)
    }));
  }

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

    // Base amount (prix par nuit × nuits)
    this.baseAmount = this.property.pricePerNight * this.totalNights;

    // TODO: Appliquer réductions (weekly, monthly)
    // if (this.totalNights >= 7 && this.property.weeklyDiscount) {
    //   const discount = this.baseAmount * (this.property.weeklyDiscount / 100);
    //   this.baseAmount -= discount;
    // }

    // Cleaning fee
    this.cleaningFee = this.property.cleaningFee || 0;

    // Pet fee
    this.petFee = hasPets && this.property.petFee ? this.property.petFee : 0;

    // Service fee (10%)
    this.serviceFee = (this.baseAmount + this.cleaningFee + this.petFee) * 0.10;

    // Total
    this.totalAmount = this.baseAmount + this.cleaningFee + this.petFee + this.serviceFee;
  }

  /**
   * ============================
   * RÉINITIALISER LE PRIX
   * ============================
   */
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
    if (this.bookingForm.invalid) {
      this.error = 'Veuillez remplir tous les champs requis';
      return;
    }

    if (!this.currentUser) {
      this.error = 'Vous devez être connecté pour réserver';
      return;
    }

    if (this.isAvailable === false) {
      this.error = 'Ces dates ne sont pas disponibles';
      return;
    }

    const formValue = this.bookingForm.value;

    const createBookingDTO: CreateBookingDTO = {
      propertyId: this.propertyId, // ✅ CORRIGÉ
      checkInDate: this.toISOString(formValue.checkIn),
      checkOutDate: this.toISOString(formValue.checkOut),
      numGuests: formValue.numGuests,
      hasPets: formValue.hasPets
    };

    // Créer la réservation (status PENDING)
    this.store.dispatch(BookingActions.createBooking({ createBookingDTO }));

    // Ouvrir la modal de paiement
    this.openPaymentModal();
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
        // Rediriger vers mes réservations
      } else if (result?.cancelled) {
        console.log('❌ Paiement annulé');
        // Annuler la réservation PENDING
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

  private toISOString(date: Date): string {
    return date.toISOString();
  }

  // Getters pour le template
  get hasMinStay(): boolean {
    return !!this.property.minStayNights && this.property.minStayNights > 1;
  }

  get hasMaxStay(): boolean {
    return !!this.property.maxStayNights;
  }

  get canReserve(): boolean {
    return this.bookingForm.valid &&
      this.isAvailable === true &&
      this.totalAmount > 0 &&
      !this.loading;
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
