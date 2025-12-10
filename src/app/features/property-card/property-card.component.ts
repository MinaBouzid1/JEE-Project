// src/app/features/listings/components/property-card/property-card.component.ts

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

// Models
import { Property, PropertySearchResultDTO } from '../../core/models/property.model';

/**
 * ============================
 * COMPOSANT PROPERTY CARD
 * Carte affichant une property (style Airbnb)
 *
 * Deux modes d'affichage :
 * - Mode browse : affiche pricePerNight
 * - Mode search : affiche totalPrice et discountPercentage
 * ============================
 */
@Component({
  selector: 'app-property-card',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './property-card.component.html',
  styleUrl: './property-card.component.scss'
})
export class PropertyCardComponent {

  @Input() property!: Property | PropertySearchResultDTO;
  @Input() isSearchMode = false;

  /**
   * ============================
   * VÉRIFIER SI C'EST UN PropertySearchResultDTO
   * ============================
   */
  isSearchResult(property: any): property is PropertySearchResultDTO {
    return 'totalPrice' in property;
  }

  /**
   * ============================
   * OBTENIR L'IMAGE DE COUVERTURE
   * ============================
   */
  getCoverImage(): string {
    if ('photos' in this.property && this.property.photos && this.property.photos.length > 0) {
      const coverPhoto = this.property.photos.find(p => p.isCover);
      return coverPhoto ? coverPhoto.photoUrl : this.property.photos[0].photoUrl;
    }
    return 'assets/images/placeholder-property.jpg';
  }

  /**
   * ============================
   * OBTENIR LE PRIX À AFFICHER
   * ============================
   */
  getDisplayPrice(): number {
    if (this.isSearchMode && this.isSearchResult(this.property)) {
      return this.property.totalPrice;
    }
    return (this.property as Property).pricePerNight || 0;
  }

  /**
   * ============================
   * OBTENIR LE LABEL DU PRIX
   * ============================
   */
  getPriceLabel(): string {
    if (this.isSearchMode && this.isSearchResult(this.property)) {
      return 'total';
    }
    return 'night';
  }

  /**
   * ============================
   * OBTENIR LA RÉDUCTION SI DISPONIBLE
   * ============================
   */
  getDiscount(): number | null {
    if (this.isSearchMode && this.isSearchResult(this.property)) {
      return this.property.discountPercentage > 0 ? this.property.discountPercentage : null;
    }
    return null;
  }

  /**
   * ============================
   * OBTENIR LE NOMBRE DE NUITS (mode search)
   * ============================
   */
  getNights(): number | null {
    if (this.isSearchMode && this.isSearchResult(this.property)) {
      return this.property.nights;
    }
    return null;
  }
}
