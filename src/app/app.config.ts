
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { authReducer } from './store/auth/auth.reducer';
import { AuthEffects } from './store/auth/auth.effects';
import { environment } from '../environments/environment';

/**
 * ============================
 * CONFIGURATION DE L'APPLICATION (STANDALONE)
 *
 * Ici on configure tous les providers globaux :
 * - Routing
 * - Animations Material
 * - NgRx Store + Effects
 * - DevTools (seulement en développement)
 * ============================
 */


export const appConfig: ApplicationConfig = {
  providers: [

    // ZONE.JS: Angular utilise pour détecter les changements automatiquement.
    // Améliore les performances en regroupant les changements
    provideZoneChangeDetection({ eventCoalescing: true }),


    // Configuration du routage Angular
    provideRouter(routes),


    // ANGULAR MATERIAL ANIMATIONS : Active les animations Material (obligatoire pour Material UI)
    provideAnimationsAsync(),


    // NGRX STORE
    // State management global de l'application
    // On enregistre ici tous les reducers
    provideStore({
      auth: authReducer  // État 'auth' géré par authReducer
      // Plus tard : listings: listingsReducer, bookings: bookingsReducer, etc.
    }),


    // NGRX EFFECTS
    // Enregistre tous les effects (side effects)
    provideEffects([
      AuthEffects  // Effects d'authentification

    ]),

    // ========================================
    // NGRX DEVTOOLS (Redux DevTools Extension) ; DevTools c'etst une extension dans le navigateur pour déboguer le store.

    //Pour déboguer le store dans le navigateur
    //
    // Installation : https://github.com/reduxjs/redux-devtools
    // Chrome : https://chrome.google.com/webstore/detail/redux-devtools
    // Firefox : https://addons.mozilla.org/firefox/addon/reduxdevtools/
    //
    // - maxAge: nombre d'actions à garder en mémoire (25 max)
    // - logOnly:
    //Si true (en production) → DevTools ne permet que de lire, pas de modifier le store.
    // Si false (en dev) → tu peux interagir avec le store (rejouer actions, annuler...).
    // ========================================
    provideStoreDevtools({
      maxAge: 25,
      logOnly: environment.production,

      connectInZone: true
    })
  ]
};
