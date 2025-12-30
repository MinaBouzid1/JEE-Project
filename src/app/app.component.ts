import { Component } from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {HomeComponent} from "./features/home/home.component";
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { Store } from '@ngrx/store';
import * as AuthActions from './store/auth/auth.actions';
import {filter} from "rxjs/operators";
import { CommonModule } from '@angular/common';
import {FooterComponent} from "./shared/components/footer/footer.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CommonModule, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  showNavbar = true;
  title = 'real-estate-rent-frontend';
  constructor(private store: Store ,private router: Router
  ) {}

  ngOnInit(): void {
    // Écouter les changements de route
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateNavbarVisibility();
      });

    // Vérifier la route initiale
    this.updateNavbarVisibility();
    // ✅ Initialiser l'auth au démarrage de l'app
    console.log('🚀 App starting - Initializing auth...');
    this.store.dispatch(AuthActions.initAuth());
  }

  /**
   * Masquer la navbar sur /login et /register
   */
  private updateNavbarVisibility(): void {
    const url = this.router.url;
    const hideNavbarRoutes = ['/login', '/register'];

    this.showNavbar = !hideNavbarRoutes.some(route => url.startsWith(route));
  }
}
