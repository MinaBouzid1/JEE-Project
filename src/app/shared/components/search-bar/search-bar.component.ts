// src/app/shared/components/search-bar/search-bar.component.ts
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// Material Imports
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

/**
 * ============================
 * SEARCH BAR COMPONENT
 * Barre de recherche pour la home page (style Airbnb)
 * ============================
 */
@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent implements OnInit {

  @ViewChild('guestsMenuTrigger') guestsMenuTrigger!: MatMenuTrigger;
  @ViewChild('dateRangePicker') dateRangePicker!: MatDatepicker<any>;

  searchForm!: FormGroup;

  // État des compteurs
  adults = 1;
  children = 0;
  babies = 0;
  pets = 0;

  // Date min (aujourd'hui)
  minDate = new Date();

  // État d'ouverture (pour gérer l'exclusivité)
  isGuestsMenuOpen = false;
  isDatePickerOpen = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  /**
   * ============================
   * ÉCOUTER LES CLICS EN DEHORS DU COMPOSANT
   * Pour fermer les overlays automatiquement
   * ============================
   */
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    // Vérifier si le clic est en dehors de la search bar
    const searchBarElement = document.querySelector('.search-bar-container');
    const isClickInsideSearchBar = searchBarElement?.contains(target);

    // Vérifier si le clic est dans un overlay Material (menu ou datepicker)
    const overlayContainer = document.querySelector('.cdk-overlay-container');
    const isClickInOverlay = overlayContainer?.contains(target);

    // Fermer si le clic est vraiment en dehors (pas dans search bar ET pas dans overlay)
    if (!isClickInsideSearchBar && !isClickInOverlay) {
      this.closeAllOverlays();
    }
  }

  /**
   * ============================
   * INITIALISER LE FORMULAIRE
   * ============================
   */
  private initForm(): void {
    this.searchForm = this.fb.group({
      location: ['', Validators.required],
      checkIn: ['', Validators.required],
      checkOut: ['', Validators.required]
    }, { validators: this.dateRangeValidator });
  }

  /**
   * ============================
   * VALIDATEUR PERSONNALISÉ : Check-out > Check-in
   * ============================
   */
  private dateRangeValidator(group: FormGroup): { [key: string]: boolean } | null {
    const checkIn = group.get('checkIn')?.value;
    const checkOut = group.get('checkOut')?.value;

    if (checkIn && checkOut && new Date(checkIn) >= new Date(checkOut)) {
      return { dateRangeInvalid: true };
    }
    return null;
  }

  /**
   * ============================
   * OUVRIR LE DATEPICKER
   * Ferme le guests menu si ouvert
   * ============================
   */
  openDatePicker(): void {
    if (this.isGuestsMenuOpen) {
      this.closeGuestsMenu();
    }
    this.dateRangePicker.open();
    this.isDatePickerOpen = true;
  }

  /**
   * ============================
   * FERMER LE DATEPICKER
   * ============================
   */
  closeDatePicker(): void {
    if (this.dateRangePicker) {
      this.dateRangePicker.close();
      this.isDatePickerOpen = false;
    }
  }

  /**
   * ============================
   * OUVRIR LE GUESTS MENU
   * Ferme le datepicker si ouvert
   * ============================
   */
  openGuestsMenu(): void {
    if (this.isDatePickerOpen) {
      this.closeDatePicker();
    }
    if (this.guestsMenuTrigger) {
      this.guestsMenuTrigger.openMenu();
      this.isGuestsMenuOpen = true;
    }
  }

  /**
   * ============================
   * FERMER LE GUESTS MENU
   * ============================
   */
  closeGuestsMenu(): void {
    if (this.guestsMenuTrigger) {
      this.guestsMenuTrigger.closeMenu();
      this.isGuestsMenuOpen = false;
    }
  }

  /**
   * ============================
   * FERMER TOUS LES OVERLAYS
   * ============================
   */
  closeAllOverlays(): void {
    this.closeDatePicker();
    this.closeGuestsMenu();
  }

  /**
   * ============================
   * ÉCOUTER LA FERMETURE DU GUESTS MENU
   * ============================
   */
  onGuestsMenuClosed(): void {
    this.isGuestsMenuOpen = false;
  }

  /**
   * ============================
   * ÉCOUTER LA FERMETURE DU DATEPICKER
   * ============================
   */
  onDatePickerClosed(): void {
    this.isDatePickerOpen = false;
  }

  /**
   * ============================
   * GESTION DES COMPTEURS (Guests)
   * ============================
   */
  incrementAdults(): void {
    if (this.adults < 16) this.adults++;
  }

  decrementAdults(): void {
    if (this.adults > 1) this.adults--;
  }

  incrementChildren(): void {
    if (this.children < 10) this.children++;
  }

  decrementChildren(): void {
    if (this.children > 0) this.children--;
  }

  incrementBabies(): void {
    if (this.babies < 5) this.babies++;
  }

  decrementBabies(): void {
    if (this.babies > 0) this.babies--;
  }

  incrementPets(): void {
    if (this.pets < 5) this.pets++;
  }

  decrementPets(): void {
    if (this.pets > 0) this.pets--;
  }

  /**
   * ============================
   * TOTAL DES GUESTS
   * ============================
   */
  getTotalGuests(): number {
    return this.adults + this.children + this.babies;
  }

  /**
   * ============================
   * TEXTE AFFICHÉ POUR LES GUESTS
   * ============================
   */
  getGuestsText(): string {
    const total = this.getTotalGuests();
    let text = `${total} guest${total > 1 ? 's' : ''}`;

    if (this.pets > 0) {
      text += `, ${this.pets} pet${this.pets > 1 ? 's' : ''}`;
    }

    return text;
  }

  /**
   * ============================
   * SOUMETTRE LA RECHERCHE
   * ============================
   */
  onSearch(): void {
    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
      return;
    }

    const location = this.searchForm.value.location;
    const checkIn = this.formatDate(this.searchForm.value.checkIn);
    const checkOut = this.formatDate(this.searchForm.value.checkOut);

    // Construire les query params
    const queryParams: any = {
      location,
      checkIn,
      checkOut,
      adults: this.adults
    };

    if (this.children > 0) queryParams.children = this.children;
    if (this.babies > 0) queryParams.babies = this.babies;
    if (this.pets > 0) queryParams.pets = this.pets;

    // Naviguer vers /listings avec les filtres
    this.router.navigate(['/listings'], { queryParams });
  }

  /**
   * ============================
   * FORMATER UNE DATE EN ISO STRING
   * ============================
   */
  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}
