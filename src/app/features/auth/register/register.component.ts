// src/app/features/auth/register/register.component.ts

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
//Subject : On l'utilise quand on veut arrêter toutes les écoutes (subscriptions) quand un composant est fermé ou supprimé.
//takeUntil = arrête automatiquement une écoute quand un signal arrive


// Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';

// Services
import { Web3Service } from '../../../core/services/web3.service';

// Store
import * as AuthActions from '../../../store/auth/auth.actions';
import { selectAuthLoading, selectAuthError } from '../../../store/auth/auth.selectors';

// Models
import { RegisterDTO } from '../../../core/models/auth.model';

/**
 * ============================
 * COMPOSANT REGISTER
 * Inscription en 2 étapes :
 * 1. Connexion MetaMask + Signature
 * 2. Formulaire (nom, prénom, email, tel, password)
 * ============================
 */
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatStepperModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit, OnDestroy {
  // Observables du store
  loading$: Observable<boolean>; // flux pour indiquer si une action (register) est en cours.
  error$: Observable<string | null>;//error$ : flux qui contient les erreurs du store.

  // Formulaire
  registerForm!: FormGroup;

  // État local
  metaMaskInstalled = false;
  isConnecting = false; // vrai quand on connecte le wallet.
  walletConnected = false;
  walletAddress: string | null = null;
  signature: string | null = null;
  hidePassword = true; //pour masquer ou afficher le mot de passe.

  // Stepper (étapes)
  isLinear = true; //  vrai cad les étapes doivent se faire dans l’ordre.
  firstStepCompleted = false;

  // Pour unsubscribe
  private destroy$ = new Subject<void>(); // arrêter l’écoute des observables quand le composant est détruit



  //injecte les services et écouter le store
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private web3Service: Web3Service,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loading$ = this.store.select(selectAuthLoading);
    this.error$ = this.store.select(selectAuthError);
  }

  ngOnInit(): void {
    // Vérifier MetaMask
    this.metaMaskInstalled = this.web3Service.isMetaMaskInstalled();

    // Initialiser le formulaire
    this.initForm();

    // Écouter les erreurs venant du store et arreter l'ecoute quand  destroy$ envoie un signal
    this.error$.pipe(takeUntil(this.destroy$)).subscribe(error => {
      if (error) {
        this.showError(error);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();  // envoie un "signal" pour dire :arrêtez tous les Observables liés à takeUntil(this.destroy$)
    this.destroy$.complete(); // complete cad l’Observable est terminé=>  plus possible d’envoyer des valeurs avec next()
  }

  /**
   * ============================
   * INITIALISER LE FORMULAIRE
   * ============================
   */
  private initForm(): void {
    this.registerForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      prenom: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      tel: ['', [Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]]
    });
  }

  /**
   * ============================
   * ÉTAPE 1 : CONNECTER METAMASK
   * ============================
   */
  async connectMetaMask(): Promise<void> {
    if (!this.metaMaskInstalled) {
      this.showError('MetaMask n\'est pas installé');
      return;
    }

    this.isConnecting = true;

    try {
      // 1. Connecter wallet
      console.log('🔗 Connexion à MetaMask...');
      const wallet = await this.web3Service.connectWallet().toPromise();

      if (!wallet) {
        throw new Error('Impossible de récupérer le wallet');
      }

      this.walletAddress = wallet;
      console.log('✅ Wallet connecté:', wallet);

      // 2. Générer message
      const message = this.web3Service.generateAuthMessage(wallet);

      // 3. Demander signature
      this.showInfo('Veuillez signer le message dans MetaMask...');
      const sig = await this.web3Service.signMessage(message).toPromise();

      if (!sig) {
        throw new Error('Signature refusée');
      }

      this.signature = sig;
      console.log('✍️ Signature reçue');

      // Marquer comme complété
      this.walletConnected = true;
      this.firstStepCompleted = true;
      this.showSuccess('Wallet connecté avec succès !');

    } catch (error: any) {
      console.error('❌ Erreur MetaMask:', error);
      this.showError(error.message || 'Erreur lors de la connexion MetaMask');
      this.walletConnected = false;
      this.firstStepCompleted = false;
    } finally {
      this.isConnecting = false;
    }
  }

  /**
   * ============================
   * ÉTAPE 2 : SOUMETTRE LE FORMULAIRE
   * ============================
   */
  onSubmit(): void {
    // Vérifier que le formulaire est valide
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this.showError('Veuillez remplir tous les champs correctement');
      return;
    }

    // Vérifier que le wallet est connecté
    if (!this.walletAddress || !this.signature) {
      this.showError('Veuillez d\'abord connecter votre wallet MetaMask');
      return;
    }

    // Créer l'objet RegisterDTO
    const registerData: RegisterDTO = {
      nom: this.registerForm.value.nom.trim(),
      prenom: this.registerForm.value.prenom.trim(),
      email: this.registerForm.value.email.trim(),
      password: this.registerForm.value.password,
      walletAdresse: this.walletAddress,
      tel: this.registerForm.value.tel?.trim() || undefined
    };

    console.log('📤 Envoi inscription:', { ...registerData, password: '***' });

    // Dispatcher l'action register
    this.store.dispatch(AuthActions.register({ registerData }));
  }

  /**
   * ============================
   * NAVIGUER VERS LOGIN
   * ============================
   */
  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  /**
   * ============================
   * GETTER POUR LES ERREURS DE FORMULAIRE
   * ============================
   */
  getErrorMessage(field: string): string {
    const control = this.registerForm.get(field);

    if (!control || !control.errors || !control.touched) {
      return '';
    }

    if (control.errors['required']) {
      return 'Ce champ est obligatoire';
    }
    if (control.errors['minlength']) {
      return `Minimum ${control.errors['minlength'].requiredLength} caractères`;
    }
    if (control.errors['maxlength']) {
      return `Maximum ${control.errors['maxlength'].requiredLength} caractères`;
    }
    if (control.errors['email']) {
      return 'Email invalide';
    }

    return 'Erreur de validation';
  }

  /**
   * ============================
   * MESSAGES SNACKBAR
   * ============================
   */
  private showError(message: string): void {
    this.snackBar.open(message, 'Fermer', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
  }

  private showInfo(message: string): void {
    this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['info-snackbar']
    });
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
  }
}
