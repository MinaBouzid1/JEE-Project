// src/app/store/listings/listings.effects.ts

import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, exhaustMap } from 'rxjs/operators';
import * as ListingsActions from './listing.actions';
import { PropertyService } from '../../core/services/property.service';

/**
 * ============================
 * LISTINGS EFFECTS
 * Gère les effets de bord pour les listings
 * ============================
 */
@Injectable()
export class ListingsEffects {
  private actions$ = inject(Actions);
  private propertyService = inject(PropertyService);

  /**
   * ============================
   * EFFECT: LOAD ALL PROPERTIES
   * ============================
   */
  loadAllProperties$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ListingsActions.loadAllProperties),
      exhaustMap(({ page = 0, size = 20 }) =>
        this.propertyService.getAllProperties(page, size).pipe(
          map(response => {
            // Spring Boot Page response : { content: [], totalElements: 0 }
            const properties = response.content || [];
            const total = response.totalElements || 0;
            return ListingsActions.loadAllPropertiesSuccess({ properties, total });
          }),
          catchError(error => {
            const errorMessage = error.message || 'Erreur lors du chargement des propriétés';
            return of(ListingsActions.loadAllPropertiesFailure({ error: errorMessage }));
          })
        )
      )
    )
  );

  /**
   * ============================
   * EFFECT: SEARCH PROPERTIES
   * ============================
   */
  searchProperties$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ListingsActions.searchProperties),
      exhaustMap(({ filters }) =>
        this.propertyService.searchProperties(filters).pipe(
          map(results => ListingsActions.searchPropertiesSuccess({ results })),
          catchError(error => {
            const errorMessage = error.message || 'Erreur lors de la recherche';
            return of(ListingsActions.searchPropertiesFailure({ error: errorMessage }));
          })
        )
      )
    )
  );

  /**
   * ============================
   * EFFECT: LOAD PROPERTY DETAIL
   * ============================
   */
  loadPropertyDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ListingsActions.loadPropertyDetail),
      exhaustMap(({ id }) =>
        this.propertyService.getPropertyById(id).pipe(
          map(property => ListingsActions.loadPropertyDetailSuccess({ property })),
          catchError(error => {
            const errorMessage = error.message || 'Erreur lors du chargement des détails';
            return of(ListingsActions.loadPropertyDetailFailure({ error: errorMessage }));
          })
        )
      )
    )
  );
}
