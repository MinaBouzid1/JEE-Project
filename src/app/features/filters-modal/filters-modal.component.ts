// src/app/features/listings/components/filters-modal/filters-modal.component.ts

import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

// Material Imports
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

// Models
import { PropertySearchFilters } from '../../core/models/property.model';
import { Amenity } from '../../core/models/amenity.model';

// Services
import { AmenityService } from '../../core/services/amenity.service';

/**
 * ============================
 * COMPOSANT FILTERS MODAL
 * Modal de filtres avancés (style Airbnb)
 * ============================
 */
@Component({
  selector: 'app-filters-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatSliderModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './filters-modal.component.html',
  styleUrl: './filters-modal.component.scss'
})
export class FiltersModalComponent implements OnInit {

  filtersForm!: FormGroup;
  amenities: Amenity[] = [];
  selectedAmenities: number[] = [];

  // Property types
  propertyTypes = [
    { value: 'house', label: 'House', icon: 'home' },
    { value: 'apartment', label: 'Apartment', icon: 'apartment' },
    { value: 'villa', label: 'Villa', icon: 'villa' },
    { value: 'studio', label: 'Studio', icon: 'meeting_room' },
    { value: 'loft', label: 'Loft', icon: 'layers' }
  ];

  // Prix min/max
  minPrice = 0;
  maxPrice = 1000;
  priceRange = [0, 1000];

  constructor(
    public dialogRef: MatDialogRef<FiltersModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private amenityService: AmenityService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadAmenities();

    // Pré-remplir avec les filtres existants
    if (this.data?.currentFilters) {
      this.prefillFilters(this.data.currentFilters);
    }
  }

  /**
   * ============================
   * INITIALISER LE FORMULAIRE
   * ============================
   */
  private initForm(): void {
    this.filtersForm = this.fb.group({
      propertyType: [null],
      placeType: [null],
      minPrice: [this.minPrice],
      maxPrice: [this.maxPrice],
      bedrooms: [null],
      bathrooms: [null],
      beds: [null],
      instantBooking: [false],
      smokingAllowed: [false],
      eventsAllowed: [false]
    });
  }

  /**
   * ============================
   * CHARGER LES AMENITIES
   * ============================
   */
  private loadAmenities(): void {
    this.amenityService.getAllAmenities().subscribe({
      next: (amenities) => {
        this.amenities = amenities;
      },
      error: (error) => {
        console.error('Erreur chargement amenities:', error);
      }
    });
  }

  /**
   * ============================
   * PRÉ-REMPLIR LES FILTRES
   * ============================
   */
  private prefillFilters(filters: PropertySearchFilters): void {
    if (filters.propertyType) {
      this.filtersForm.patchValue({ propertyType: filters.propertyType });
    }
    if (filters.minPrice !== undefined) {
      this.priceRange[0] = filters.minPrice;
      this.filtersForm.patchValue({ minPrice: filters.minPrice });
    }
    if (filters.maxPrice !== undefined) {
      this.priceRange[1] = filters.maxPrice;
      this.filtersForm.patchValue({ maxPrice: filters.maxPrice });
    }
    if (filters.bedrooms) {
      this.filtersForm.patchValue({ bedrooms: filters.bedrooms });
    }
    if (filters.amenityIds) {
      this.selectedAmenities = filters.amenityIds;
    }
  }

  /**
   * ============================
   * SÉLECTIONNER UN TYPE DE PROPERTY
   * ============================
   */
  selectPropertyType(type: string): void {
    const currentType = this.filtersForm.value.propertyType;
    this.filtersForm.patchValue({
      propertyType: currentType === type ? null : type
    });
  }

  /**
   * ============================
   * TOGGLE AMENITY
   * ============================
   */
  toggleAmenity(amenityId: number): void {
    const index = this.selectedAmenities.indexOf(amenityId);
    if (index > -1) {
      this.selectedAmenities.splice(index, 1);
    } else {
      this.selectedAmenities.push(amenityId);
    }
  }

  /**
   * ============================
   * VÉRIFIER SI AMENITY EST SÉLECTIONNÉE
   * ============================
   */
  isAmenitySelected(amenityId: number): boolean {
    return this.selectedAmenities.includes(amenityId);
  }

  /**
   * ============================
   * MAJ PRIX MIN/MAX
   * ============================
   */
  onPriceRangeChange(event: any): void {
    this.priceRange = [event.value[0], event.value[1]];
    this.filtersForm.patchValue({
      minPrice: event.value[0],
      maxPrice: event.value[1]
    });
  }

  /**
   * ============================
   * INCRÉMENTER/DÉCRÉMENTER
   * ============================
   */
  increment(field: string): void {
    const current = this.filtersForm.value[field] || 0;
    this.filtersForm.patchValue({ [field]: current + 1 });
  }

  decrement(field: string): void {
    const current = this.filtersForm.value[field] || 0;
    if (current > 0) {
      this.filtersForm.patchValue({ [field]: current - 1 });
    }
  }

  /**
   * ============================
   * RÉINITIALISER LES FILTRES
   * ============================
   */
  clearAll(): void {
    this.filtersForm.reset({
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      instantBooking: false,
      smokingAllowed: false,
      eventsAllowed: false
    });
    this.selectedAmenities = [];
    this.priceRange = [this.minPrice, this.maxPrice];
  }

  /**
   * ============================
   * APPLIQUER LES FILTRES
   * ============================
   */
  applyFilters(): void {
    const filters: PropertySearchFilters = {
      adults: 1, // Valeur par défaut
      ...this.filtersForm.value,
      amenityIds: this.selectedAmenities.length > 0 ? this.selectedAmenities : undefined
    };

    this.dialogRef.close(filters);
  }

  /**
   * ============================
   * FERMER SANS APPLIQUER
   * ============================
   */
  close(): void {
    this.dialogRef.close();
  }
}
