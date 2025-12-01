// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { noAuthGuard } from './core/guards/no-auth.guard';

/**
 * ============================
 * CONFIGURATION DES ROUTES (STANDALONE)
 * ============================
 */
// component: XComponent => eager loading : le composant est inclus dès le démarrage de l’application.
  //import('path-component')=> Lazy loading : charger le composant uniquement quand on navigue vers /login.


export const routes: Routes = [
  // ========================================
  // PAGE D'ACCUEIL  : Redirige vers /listings par défaut
  // ========================================
  {
    path: '',
    redirectTo: '/listings',
    pathMatch: 'full'
  },

  // ========================================
  // ROUTES PUBLIQUES (AUTH) : cad Accessibles SEULEMENT si NON connecté (noAuthGuard)
  // Si déjà connecté → redirection vers /
  // ========================================
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent),
    canActivate: [noAuthGuard],
    data: { title: 'Connexion' }
  },

  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent),
    canActivate: [noAuthGuard],
    data: { title: 'Inscription' }
  },
    /*
     // ========================================
     // ROUTES PROTÉGÉES (NÉCESSITE AUTHENTIFICATION)
     // Accessibles SEULEMENT si connecté (authGuard)
     // Si non connecté → redirection vers /login
     // ========================================
     {
       path: 'profile',
       loadComponent: () => import('./features/profile/profile.component').then(m => m.ProfileComponent),
       canActivate: [authGuard],
       data: { title: 'Mon Profil' }
     },
     {
       path: 'bookings',
       loadComponent: () => import('./features/bookings/bookings.component').then(m => m.BookingsComponent),
       canActivate: [authGuard],
       data: { title: 'Mes Réservations' }
     },
     {
       path: 'messages',
       loadComponent: () => import('./features/messages/messages.component').then(m => m.MessagesComponent),
       canActivate: [authGuard],
       data: { title: 'Mes Messages' }
     },

     // ========================================
     // ROUTES SEMI-PUBLIQUES (LISTINGS)
     // Accessibles à tous, mais certaines actions nécessitent authentification
     // Lazy loading des routes listings (performance)
     // ========================================
     {
       path: 'listings',
       loadChildren: () => import('./features/listings/listings.routes').then(m => m.LISTINGS_ROUTES)
     },

     // ========================================
     // PAGE 404 (NOT FOUND)
     // Catch-all route : toutes les URLs non définies arrivent ici
     // ** = wildcard (n'importe quel path)
     // ========================================
     {
       path: '**',
       loadComponent: () => import('./shared/components/not-found/not-found.component').then(m => m.NotFoundComponent),
       data: { title: 'Page non trouvée' }
     }*/

];
