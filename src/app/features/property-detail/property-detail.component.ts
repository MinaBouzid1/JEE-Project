// src/app/features/property-detail/property-detail.component.ts

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

// Material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';

// Leaflet
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import * as L from 'leaflet';

// Models & Services
import { Property } from '../../core/models/property.model';
import { PropertyService } from '../../core/services/property.service';

/**
 * ============================
 * COMPOSANT PROPERTY DETAIL
 * Page de détails d'une propriété
 * ============================
 */
@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
    MatDialogModule,
    LeafletModule
  ],
  templateUrl: './property-detail.component.html',
  styleUrl: './property-detail.component.scss'
})
export class PropertyDetailComponent implements OnInit, OnDestroy {

  property: Property | null = null;
  loading = true;
  error: string | null = null;

  // Photos
  mainPhoto: string = '';
  visiblePhotos: string[] = [];
  allPhotos: string[] = [];

  // Map Leaflet
  map!: L.Map;
  mapOptions: any;
  mapLayers: L.Layer[] = [];

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private propertyService: PropertyService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const propertyId = this.route.snapshot.paramMap.get('id');
    if (propertyId) {
      this.loadProperty(+propertyId);
    } else {
      this.error = 'Invalid property ID';
      this.loading = false;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * ============================
   * CHARGER LA PROPRIÉTÉ
   * ============================
   */
  private loadProperty(id: number): void {
    this.loading = true;
    this.propertyService.getPropertyById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (property) => {
          this.property = property;
          this.preparePhotos();
          this.initMap();
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading property:', error);
          this.error = 'Failed to load property';
          this.loading = false;
        }
      });
  }

  /**
   * ============================
   * PRÉPARER LES PHOTOS
   * ============================
   */
  private preparePhotos(): void {
    if (!this.property?.photos || this.property.photos.length === 0) {
      return;
    }

    // Trier par ordre
    const sortedPhotos = [...this.property.photos].sort((a, b) =>
      (a.displayOrder || 0) - (b.displayOrder || 0)
    );

    this.allPhotos = sortedPhotos.map(p => p.photoUrl);
    this.mainPhoto = this.allPhotos[0] || '';

    // Afficher 5 photos max dans la grille (1 principale + 4 secondaires)
    this.visiblePhotos = this.allPhotos.slice(0, 5);
  }

  /**
   * ============================
   * INITIALISER LA MAP
   * ============================
   */
  private initMap(): void {
    if (!this.property?.latitude || !this.property?.longitude) {
      return;
    }

    const lat = this.property.latitude;
    const lng = this.property.longitude;

    this.mapOptions = {
      layers: [
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          attribution: '© OpenStreetMap'
        })
      ],
      zoom: 15,
      center: L.latLng(lat, lng)
    };

    // Marker
    const marker = L.marker([lat, lng], {
      icon: L.icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'assets/marker-icon.png',
        shadowUrl: 'assets/marker-shadow.png'
      })
    });

    this.mapLayers = [marker];
  }

  /**
   * ============================
   * OUVRIR GALERIE COMPLÈTE
   * ============================
   */
  openPhotoGallery(): void {
    // TODO: Ouvrir un dialog avec toutes les photos en carousel
    console.log('Opening photo gallery with', this.allPhotos.length, 'photos');
  }

  /**
   * ============================
   * GETTERS POUR L'AFFICHAGE
   * ============================
   */
  get hasMorePhotos(): boolean {
    return this.allPhotos.length > 5;
  }

  get remainingPhotosCount(): number {
    return this.allPhotos.length - 5;
  }

  get pricePerNight(): number {
    return this.property?.pricePerNight || 0;
  }

  get weekendPrice(): number | null {
    return this.property?.weekendPricePerNight || null;
  }

  get hasWeekendPrice(): boolean {
    return !!this.weekendPrice && this.weekendPrice !== this.pricePerNight;
  }

  /**
   * ============================
   * RETOUR À LA LISTE
   * ============================
   */
  goBack(): void {
    this.router.navigate(['/listings']);
  }
}
