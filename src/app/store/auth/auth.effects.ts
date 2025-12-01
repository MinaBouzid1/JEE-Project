// src/app/store/auth/auth.effects.ts

import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
// Actions → c’est un flux (stream) de toutes les actions dispatchées dans l’application.
// createEffect → sert à créer un effect, c’est-à-dire une réaction à une action.
// ofType → permet de filtrer seulement les actions qui nous intéressent.

import { Router } from '@angular/router';
import { of } from 'rxjs';
import { map, catchError, exhaustMap, tap } from 'rxjs/operators';
//map pour Transformer une valeur en une autre
//exhaustMap on la utilise pour ignorer les nouvelles actions de type x tant que la précédente n'est pas terminée
import * as AuthActions from './auth.actions';
import { AuthService } from '../../core/services/auth.service';// importer tous les apis pour login, register, logout, etc.

/**
 * ============================
 * AUTH EFFECTS
 * Gère les effets de bord (side effects) des actions d'authentification
 *
 * Effect = réaction à une action qui provoque un appel API ou une navigation
 *
 * Flow typique :
 * 1. Composant dispatch une action (ex: register)
 * 2. Effect intercepte l'action et appelle l'API
 * 3. Effect dispatch une nouvelle action (registerSuccess ou registerFailure)
 * 4. Reducer met à jour l'état en conséquence
 * ============================
 */


@Injectable()
export class AuthEffects {



    private actions$ = inject(Actions);
    private authService = inject(AuthService);
    private router = inject(Router);


  // ========================================
  // EFFECT: REGISTER (INSCRIPTION)
  // ========================================

  /**
   * Écoute l'action 'register', appelle l'API, puis dispatch registerSuccess ou registerFailure
   * exhaustMap = ignore les nouvelles actions register tant que la précédente n'est pas terminée
   */
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register), // Écouter uniquement l'action 'register'
      // apres qu'on reçoit l’action, on récupère registerData
      exhaustMap(({ registerData }) =>
        this.authService.register(registerData).pipe(
          map(response => AuthActions.registerSuccess({ response })), // si succès, dispatch action registerSuccess.
          catchError(error => {
            const errorMessage = error.message || 'Erreur lors de l\'inscription';
            return of(AuthActions.registerFailure({ error: errorMessage }));
          })
        )
      )
    )
  );

  /**
   * Après une inscription réussie, rediriger vers la page d'accueil
   * dispatch: false = ne pas dispatcher une nouvelle action
   */
  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.registerSuccess),
        tap(() => {
          console.log('✅ Inscription réussie. Redirection vers /');
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  // ========================================
  // EFFECT: LOGIN (CONNEXION)
  // ========================================

  /**
   * Écoute l'action 'login', appelle l'API, puis dispatch loginSuccess ou loginFailure
   */
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(({ loginData }) =>
        this.authService.login(loginData).pipe(
          map(response => AuthActions.loginSuccess({ response })),
          catchError(error => {
            const errorMessage = error.message || 'Erreur lors de la connexion';
            return of(AuthActions.loginFailure({ error: errorMessage }));
          })
        )
      )
    )
  );

  /**
   * Après une connexion réussie, rediriger vers la page d'accueil
   * Ou vers l'URL sauvegardée dans returnUrl (ex: /profile)
   */
  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => {
          // Récupérer l'URL de retour si elle existe
          const returnUrl = new URLSearchParams(window.location.search).get('returnUrl');
          const targetUrl = returnUrl || '/';

          console.log(`✅ Connexion réussie. Redirection vers ${targetUrl}`);
          this.router.navigate([targetUrl]);
        })
      ),
    { dispatch: false }
  );

  // ========================================
  // EFFECT: LOAD CURRENT USER
  // ========================================

  /**
   * Charge l'utilisateur actuel depuis le backend
   */
  loadCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadCurrentUser),
      exhaustMap(() =>
        this.authService.loadCurrentUser().pipe(
          map(user => AuthActions.loadCurrentUserSuccess({ user })),
          catchError(error => {
            const errorMessage = error.message || 'Erreur lors du chargement de l\'utilisateur';
            return of(AuthActions.loadCurrentUserFailure({ error: errorMessage }));
          })
        )
      )
    )
  );

  // ========================================
  // EFFECT: LOGOUT (DÉCONNEXION)
  // ========================================

  /**
   * Quand l'utilisateur se déconnecte, appeler authService.logout() puis rediriger
   */
  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          console.log('👋 Déconnexion en cours...');
          this.authService.logout();
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  // ========================================
  // EFFECT: EMAIL VERIFICATION
  // ========================================

  /**
   * Demander l'envoi d'un email de vérification
   */
  requestEmailVerification$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.requestEmailVerification),
      exhaustMap(({ email }) =>
        this.authService.requestEmailVerification(email).pipe(
          map(response =>
            AuthActions.requestEmailVerificationSuccess({ message: response.message })
          ),
          catchError(error => {
            const errorMessage = error.message || 'Erreur lors de l\'envoi de l\'email';
            return of(AuthActions.requestEmailVerificationFailure({ error: errorMessage }));
          })
        )
      )
    )
  );
}
