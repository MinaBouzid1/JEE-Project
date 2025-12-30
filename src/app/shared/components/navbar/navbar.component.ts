// src/app/shared/components/navbar/navbar.component.ts

import { Component, OnInit, HostListener, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { filter } from 'rxjs/operators';

// Material Imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';

// Store
import * as AuthActions from '../../../store/auth/auth.actions';
import {
  selectCurrentUser,
  selectIsAuthenticated,
  selectIsHost
} from '../../../store/auth/auth.selectors';

// Models
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    MatDividerModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, OnDestroy {
  // Observables
  currentUser$: Observable<User | null>;
  isAuthenticated$: Observable<boolean>;
  isHost$: Observable<boolean>;

  // État local
  userInitial = '';
  isHomePage = true;
  isScrolled = false;

  // ✅ Référence au menu trigger
  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;

  private destroy$ = new Subject<void>();

  constructor(
    private store: Store,
    private router: Router
  ) {
    this.currentUser$ = this.store.select(selectCurrentUser);
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
    this.isHost$ = this.store.select(selectIsHost);
  }

  ngOnInit(): void {
    // S'abonner à currentUser pour récupérer l'initiale
    this.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        if (user && user.email) {
          this.userInitial = user.email.charAt(0).toUpperCase();
        } else {
          this.userInitial = '';
        }
      });

    // Écouter les changements de route
    this.checkIfHomePage();
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.checkIfHomePage();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private checkIfHomePage(): void {
    this.isHomePage = this.router.url === '/' || this.router.url === '';
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 50;
  }

  // ============================
  // NAVIGATION
  // ============================
  navigateToHome(): void {
    this.router.navigate(['/']);
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }

  navigateToProfile(): void {
    this.router.navigate(['/profile']);
  }

  navigateToSettings(): void {
    this.router.navigate(['/settings']);
  }

  navigateToMessages(): void {
    this.router.navigate(['/messages']);
  }

  navigateToBecomeHost(): void {
    this.router.navigate(['/become-host']);
  }

  navigateToBookings(): void {
    this.router.navigate(['/bookings']);
  }

  // ============================
  // DÉCONNEXION
  // ============================
  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}
