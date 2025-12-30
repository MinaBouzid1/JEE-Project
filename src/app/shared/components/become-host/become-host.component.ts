// src/app/shared/components/become-host/become-host.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, combineLatest } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

// Store Selectors
import {
  selectIsAuthenticated,
  selectIsHost
} from '../../../store/auth/auth.selectors';

interface Benefit {
  icon: string;
  title: string;
  description: string;
}

interface Stat {
  value: string;
  label: string;
}

type UserStatus = 'guest' | 'user' | 'host';

@Component({
  selector: 'app-become-host',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './become-host.component.html',
  styleUrl: './become-host.component.scss'
})
export class BecomeHostComponent implements OnInit, OnDestroy {

  // Observables depuis le store
  isAuthenticated$: Observable<boolean>;
  isHost$: Observable<boolean>;

  // État du composant
  userStatus: UserStatus = 'guest';
  shouldDisplay: boolean = true;

  private destroy$ = new Subject<void>();

  benefits: Benefit[] = [
    {
      icon: 'payments',
      title: 'Earn with Ethereum',
      description: 'Receive payments directly in cryptocurrency with transparent blockchain transactions'
    },
    {
      icon: 'verified_user',
      title: 'Smart Contract Security',
      description: 'Automated escrow and payment release with no intermediaries'
    },
    {
      icon: 'public',
      title: 'Global Reach',
      description: 'Access international renters who prefer decentralized platforms'
    },
    {
      icon: 'trending_up',
      title: 'Set Your Own Terms',
      description: 'Full control over pricing, availability, and house rules'
    }
  ];

  stats: Stat[] = [
    { value: '5,000+', label: 'Active Hosts' },
    { value: '2%', label: 'Platform Fees' },
    { value: '24/7', label: 'Support' }
  ];

  constructor(
    private store: Store,
    private router: Router
  ) {
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
    this.isHost$ = this.store.select(selectIsHost);
  }

  ngOnInit(): void {
    // Combiner les deux observables pour déterminer le statut de l'utilisateur
    combineLatest([this.isAuthenticated$, this.isHost$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([isAuthenticated, isHost]) => {
        if (!isAuthenticated) {
          this.userStatus = 'guest';
          this.shouldDisplay = true; // Toujours afficher pour les invités
        } else if (isAuthenticated && !isHost) {
          this.userStatus = 'user';
          this.shouldDisplay = true; // Afficher pour encourager à devenir host
        } else if (isAuthenticated && isHost) {
          this.userStatus = 'host';
          this.shouldDisplay = false; // Ne pas afficher si déjà host
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ============================
  // GETTERS ADAPTATIFS
  // ============================

  get title(): string {
    switch(this.userStatus) {
      case 'guest':
        return 'Become a Host';
      case 'user':
        return 'List Your First Property';
      case 'host':
        return 'Add Another Property';
      default:
        return 'Become a Host';
    }
  }

  get subtitle(): string {
    switch(this.userStatus) {
      case 'guest':
        return 'List your property on the blockchain and start earning with transparent, secure transactions';
      case 'user':
        return 'You\'re ready to start hosting! List your property and begin earning with Ethereum';
      case 'host':
        return 'Expand your portfolio and maximize your earnings with another listing';
      default:
        return 'List your property on the blockchain and start earning';
    }
  }

  get badgeText(): string {
    switch(this.userStatus) {
      case 'guest':
        return 'For Property Owners';
      case 'user':
        return 'Start Hosting';
      case 'host':
        return 'Grow Your Business';
      default:
        return 'For Property Owners';
    }
  }

  get ctaButtonText(): string {
    switch(this.userStatus) {
      case 'guest':
        return 'List Your Property';
      case 'user':
        return 'Add Your First Property';
      case 'host':
        return 'Add Another Property';
      default:
        return 'List Your Property';
    }
  }

  // ============================
  // NAVIGATION
  // ============================

  navigateToHostSignup(): void {
    if (this.userStatus === 'guest') {
      // Si non connecté → rediriger vers inscription
      this.router.navigate(['/register'], {
        queryParams: { becomeHost: true }
      });
    } else {
      // Si connecté → rediriger vers création de propriété
      this.router.navigate(['/host/create-property']);
    }
  }
}
