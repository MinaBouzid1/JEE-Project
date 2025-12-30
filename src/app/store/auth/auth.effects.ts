// src/app/store/auth/auth.effects.ts

import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { map, catchError, exhaustMap, tap } from 'rxjs/operators';

import * as AuthActions from './auth.actions';
import { AuthService } from '../../core/services/auth.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);

  // ========================================
  // EFFECT: REGISTER
  // ========================================
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      exhaustMap(({ registerData }) =>
        this.authService.register(registerData).pipe(
          map(response => AuthActions.registerSuccess({ response })),
          catchError(error => {
            const errorMessage = error.message || "Erreur lors de l'inscription";
            return of(AuthActions.registerFailure({ error: errorMessage }));
          })
        )
      )
    )
  );

  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.registerSuccess),
        tap(() => this.router.navigate(['/']))
      ),
    { dispatch: false }
  );

  // ========================================
  // EFFECT: LOGIN
  // ========================================
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

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => {
          const returnUrl = new URLSearchParams(window.location.search).get('returnUrl');
          const targetUrl = returnUrl || '/';
          this.router.navigate([targetUrl]);
        })
      ),
    { dispatch: false }
  );

  // ========================================
  // EFFECT: INIT AUTH (RESTAURATION AU DÉMARRAGE)
  // ========================================
  initAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.initAuth),
      exhaustMap(() => {
        const token = localStorage.getItem(environment.tokenKey);
        const userStr = localStorage.getItem(environment.userKey);

        if (!token || !userStr) {
          return of(AuthActions.initAuthFailure());
        }

        try {
          const user = JSON.parse(userStr);

          return this.authService.loadCurrentUser().pipe(
            map(updatedUser => AuthActions.initAuthSuccess({
              user: updatedUser,
              token
            })),
            catchError(() => {
              this.authService.logout();
              return of(AuthActions.initAuthFailure());
            })
          );
        } catch (error) {
          return of(AuthActions.initAuthFailure());
        }
      })
    )
  );

  // ========================================
  // EFFECT: LOAD CURRENT USER
  // ========================================
  loadCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadCurrentUser),
      exhaustMap(() =>
        this.authService.loadCurrentUser().pipe(
          map(user => AuthActions.loadCurrentUserSuccess({ user })),
          catchError(error => {
            const errorMessage = error.message || "Erreur lors du chargement de l'utilisateur";
            return of(AuthActions.loadCurrentUserFailure({ error: errorMessage }));
          })
        )
      )
    )
  );

  // ========================================
  // EFFECT: LOGOUT
  // ========================================
  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          this.authService.logout();
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  // ========================================
  // EFFECT: EMAIL VERIFICATION
  // ========================================
  requestEmailVerification$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.requestEmailVerification),
      exhaustMap(({ email }) =>
        this.authService.requestEmailVerification(email).pipe(
          map(response =>
            AuthActions.requestEmailVerificationSuccess({ message: response.message })
          ),
          catchError(error => {
            const errorMessage = error.message || "Erreur lors de l'envoi de l'email";
            return of(AuthActions.requestEmailVerificationFailure({ error: errorMessage }));
          })
        )
      )
    )
  );
}
