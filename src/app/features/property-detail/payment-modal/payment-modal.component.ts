// src/app/features/property-detail/components/payment-modal/payment-modal.component.ts

import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Subject, takeUntil, combineLatest, filter } from 'rxjs';
import { Store } from '@ngrx/store';

// Material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDividerModule } from '@angular/material/divider';

// Models
import { PropertyDetail } from '../../../core/models/property-detail.model';
import { SignedTransactionRequest } from '../../../core/models/payment.model';

// Store
import * as PaymentActions from '../../../store/payment/payment.actions';
import * as BookingActions from '../../../store/booking/booking.actions';
import {
  selectIsWalletConnected,
  selectWalletAddress,
  selectHasSufficientBalance,
  selectPaymentSteps,
  selectCurrentTransaction,
  selectIsPolling,
  selectPollingProgress,
  selectPaymentError,
  selectIsTransactionConfirmed
} from '../../../store/payment/payment.selectors';
import {
  selectCurrentBooking,
  selectBookingError
} from '../../../store/booking/booking.selectors';
import { selectCurrentUser } from '../../../store/auth/auth.selectors';

// Services
import { Web3Service } from '../../../core/services/web3.service';

/**
 * ============================
 * PAYMENT MODAL DATA
 * Données passées à la modal
 * ============================
 */
export interface PaymentModalData {
  property: PropertyDetail;
  totalAmount: number;
  totalNights: number;
  checkIn: Date;
  checkOut: Date;
  numGuests: number;
}

/**
 * ============================
 * PAYMENT MODAL COMPONENT
 * Gère le processus complet de paiement :
 * 1. Connexion MetaMask
 * 2. Vérification solde
 * 3. Signature transaction
 * 4. Confirmation backend
 * 5. Polling confirmation on-chain
 * ============================
 */
@Component({
  selector: 'app-payment-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatDividerModule
  ],
  templateUrl: './payment-modal.component.html',
  styleUrl: './payment-modal.component.scss'
})
export class PaymentModalComponent implements OnInit, OnDestroy {

  // États du processus
  currentStep = 0;
  isWalletConnected = false;
  walletAddress: string | null = null;
  hasSufficientBalance: boolean | null = null;

  // Transaction
  txHash: string | null = null;
  reservationId: number | null = null;
  isPolling = false;
  pollingProgress = 0;
  isConfirmed = false;

  // Erreurs
  error: string | null = null;

  // Loading
  loading = false;

  private destroy$ = new Subject<void>();

  constructor(
    public dialogRef: MatDialogRef<PaymentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PaymentModalData,
    private store: Store,
    private web3Service: Web3Service
  ) {}

  ngOnInit(): void {
    this.initPaymentSteps();
    this.subscribeToStore();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    // Arrêter le polling si en cours
    if (this.isPolling) {
      this.store.dispatch(PaymentActions.stopPolling());
    }
  }

  /**
   * ============================
   * INITIALISER LES ÉTAPES
   * ============================
   */
  private initPaymentSteps(): void {
    this.store.dispatch(PaymentActions.initPaymentSteps());
  }

  /**
   * ============================
   * SOUSCRIPTIONS AU STORE
   * ============================
   */
  private subscribeToStore(): void {
    // Wallet
    combineLatest([
      this.store.select(selectIsWalletConnected),
      this.store.select(selectWalletAddress)
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([connected, address]) => {
        this.isWalletConnected = connected;
        this.walletAddress = address;

        if (connected) {
          this.currentStep = Math.max(this.currentStep, 1);
          this.updateStep(1, 'completed');
        }
      });

    // Solde
    this.store.select(selectHasSufficientBalance)
      .pipe(takeUntil(this.destroy$))
      .subscribe(sufficient => {
        this.hasSufficientBalance = sufficient;

        if (sufficient === true) {
          this.currentStep = Math.max(this.currentStep, 2);
          this.updateStep(2, 'completed');
        } else if (sufficient === false) {
          this.error = 'Solde insuffisant';
          this.updateStep(2, 'failed', 'Solde insuffisant');
        }
      });

    // Réservation créée
    this.store.select(selectCurrentBooking)
      .pipe(
        filter(booking => booking !== null),
        takeUntil(this.destroy$)
      )
      .subscribe(booking => {
        if (booking) {
          this.reservationId = booking.id;
          console.log('✅ Réservation créée:', booking.id);
        }
      });

    // Transaction créée
    this.store.select(selectCurrentTransaction)
      .pipe(
        filter(tx => tx !== null),
        takeUntil(this.destroy$)
      )
      .subscribe(transaction => {
        if (transaction) {
          this.txHash = transaction.transactionHash;
          this.currentStep = Math.max(this.currentStep, 4);
          this.updateStep(3, 'completed');
          console.log('✅ Transaction enregistrée:', this.txHash);

          // Démarrer le polling
          this.startPolling();
        }
      });

    // Polling
    combineLatest([
      this.store.select(selectIsPolling),
      this.store.select(selectPollingProgress)
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([polling, progress]) => {
        this.isPolling = polling;
        this.pollingProgress = progress;

        if (polling) {
          this.updateStep(4, 'processing', `Confirmation en cours... ${progress}%`);
        }
      });

    // Confirmation on-chain
    this.store.select(selectIsTransactionConfirmed)
      .pipe(
        filter(confirmed => confirmed === true),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.isConfirmed = true;
        this.updateStep(4, 'completed');
        this.updateStep(5, 'completed');
        this.currentStep = 5;

        console.log('✅ Transaction confirmée on-chain!');

        // Fermer la modal après 2 secondes
        setTimeout(() => {
          this.close(true);
        }, 2000);
      });

    // Erreurs
    combineLatest([
      this.store.select(selectPaymentError),
      this.store.select(selectBookingError)
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([paymentError, bookingError]) => {
        this.error = paymentError || bookingError;
      });
  }

  /**
   * ============================
   * ÉTAPE 1 : CONNECTER WALLET
   * ============================
   */
  connectWallet(): void {
    console.log('🔥 Connexion MetaMask...');
    this.loading = true;
    this.updateStep(1, 'processing');

    this.store.dispatch(PaymentActions.connectWallet());

    // Le résultat sera géré par les souscriptions
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  /**
   * ============================
   * ÉTAPE 2 : VÉRIFIER SOLDE
   * ============================
   */
  verifyBalance(): void {
    if (!this.walletAddress) {
      this.error = 'Wallet non connecté';
      return;
    }

    console.log('🔥 Vérification du solde...');
    this.loading = true;
    this.updateStep(2, 'processing');

    this.store.dispatch(PaymentActions.verifyBalance({
      request: {
        walletAddress: this.walletAddress,
        requiredAmountEth: this.totalAmountEth
      }
    }));

    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  /**
   * ============================
   * ÉTAPE 3 : SIGNER TRANSACTION METAMASK
   * ============================
   */
  async signTransaction(): Promise<void> {
    if (!this.walletAddress || !this.reservationId) {
      this.error = 'Données manquantes';
      return;
    }

    console.log('🔥 Signature de la transaction MetaMask...');
    this.loading = true;
    this.updateStep(3, 'processing');

    try {
      // Ouvrir MetaMask pour signer
      const txHash = await this.requestMetaMaskTransaction();

      if (!txHash) {
        throw new Error('Transaction annulée');
      }

      console.log('✅ Transaction signée:', txHash);

      // Envoyer au backend
      this.confirmPaymentToBackend(txHash);

    } catch (error: any) {
      console.error('❌ Erreur signature:', error);
      this.error = error.message || 'Erreur lors de la signature';
      this.updateStep(3, 'failed');
      this.loading = false;
    }
  }

  /**
   * ============================
   * DEMANDER SIGNATURE METAMASK
   * ============================
   */
  private async requestMetaMaskTransaction(): Promise<string | null> {
    if (!window.ethereum) {
      throw new Error('MetaMask non installé');
    }

    try {
      // Préparer la transaction
      const transactionParameters = {
        to: this.data.property.userId.toString(), // TODO: Récupérer wallet du host
        from: this.walletAddress!,
        value: this.web3Service.ethToWei(this.totalAmountEth),
        gas: '0x5208', // 21000 gas
      };

      // Demander signature
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });

      return txHash;

    } catch (error: any) {
      if (error.code === 4001) {
        throw new Error('Transaction refusée par l\'utilisateur');
      }
      throw error;
    }
  }

  /**
   * ============================
   * CONFIRMER AU BACKEND
   * ============================
   */
  private confirmPaymentToBackend(txHash: string): void {
    if (!this.reservationId || !this.walletAddress) return;

    const request: SignedTransactionRequest = {
      reservationId: this.reservationId,
      transactionHash: txHash,
      fromAddress: this.walletAddress,
      amountEth: this.totalAmountEth,
      tenantId: 1 // TODO: Récupérer depuis currentUser
    };

    this.store.dispatch(PaymentActions.confirmPayment({ request }));
    this.loading = false;
  }

  /**
   * ============================
   * DÉMARRER POLLING
   * ============================
   */
  private startPolling(): void {
    if (!this.txHash || !this.reservationId) return;

    console.log('🔥 Démarrage du polling...');
    this.store.dispatch(PaymentActions.startPolling({
      txHash: this.txHash,
      reservationId: this.reservationId
    }));
  }

  /**
   * ============================
   * METTRE À JOUR ÉTAPE
   * ============================
   */
  private updateStep(
    step: number,
    status: 'pending' | 'processing' | 'completed' | 'failed',
    message?: string
  ): void {
    this.store.dispatch(PaymentActions.updatePaymentStep({
      step,
      status,
      message
    }));
  }

  /**
   * ============================
   * ANNULER
   * ============================
   */
  cancel(): void {
    // Annuler la réservation si elle existe
    if (this.reservationId) {
      this.store.dispatch(BookingActions.cancelBooking({
        id: this.reservationId,
        reason: 'Paiement annulé par l\'utilisateur'
      }));
    }

    this.close(false);
  }

  /**
   * ============================
   * FERMER MODAL
   * ============================
   */
  close(success: boolean): void {
    this.dialogRef.close({
      success,
      txHash: this.txHash,
      reservationId: this.reservationId
    });
  }

  /**
   * ============================
   * GETTERS
   * ============================
   */
  get totalAmountEth(): number {
    // Convertir EUR en ETH (prix fixe pour démo)
    // TODO: Récupérer taux de change réel EUR/ETH
    const ethPrice = 2000; // 1 ETH = 2000 EUR
    return this.data.totalAmount / ethPrice;
  }

  get canProceed(): boolean {
    switch (this.currentStep) {
      case 0:
        return true;
      case 1:
        return this.isWalletConnected;
      case 2:
        return this.hasSufficientBalance === true;
      case 3:
        return this.reservationId !== null;
      default:
        return false;
    }
  }

  get stepLabel(): string {
    const labels = [
      'Connexion wallet',
      'Vérification du solde',
      'Signature de la transaction',
      'Confirmation on-chain',
      'Réservation confirmée'
    ];
    return labels[this.currentStep] || '';
  }
}

// Déclaration globale pour TypeScript
declare global {
  interface Window {
    ethereum?: any;
  }
}
