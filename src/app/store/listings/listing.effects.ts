// src/app/store/listings/listing.effects.ts

import {inject, Injectable} from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, exhaustMap, switchMap } from 'rxjs/operators';

import { PropertyService } from '../../core/services/property.service';
import * as ListingsActions from './listing.actions';

/**
 * ============================
 * LISTING EFFECTS
 * Gère les side effects (appels API) pour le store listings
 * ============================
 */
@Injectable()
export class ListingsEffects {
  private actions$ = inject(Actions);
  private propertyService = inject(PropertyService);

  /**
   * ============================
   * EFFECT: LOAD ALL PROPERTIES
   * Déclenché par: loadAllProperties
   * Appelle: getAllProperties() du service
   * ============================
   */
  loadAllProperties$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ListingsActions.loadAllProperties),
      exhaustMap(({ page = 0, size = 50 }) =>
        this.propertyService.getAllProperties(page, size).pipe(
          map(response => {
            // response est une Page<Property> avec { content: Property[], totalElements: number }
            const properties = response.content || [];
            const total = response.totalElements || 0;
console.log(properties);
            return ListingsActions.loadAllPropertiesSuccess({
              properties,
              total
            });
          }),
          catchError(error => {
            console.error('Erreur loadAllProperties:', error);
            return of(ListingsActions.loadAllPropertiesFailure({
              error: error.message || 'Erreur lors du chargement des propriétés'
            }));
          })
        )
      )
    )
  );

  /**
   * ============================
   * EFFECT: SEARCH PROPERTIES (AVEC DATES)
   * Déclenché par: searchProperties
   * Appelle: searchProperties() du service
   * Utilisé quand on a checkIn/checkOut
   * ============================
   */
  searchProperties$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ListingsActions.searchProperties),
      exhaustMap(({ filters }) =>
        this.propertyService.searchProperties(filters).pipe(
          map(results => {
            console.log('✅ Résultats recherche (avec dates):', results.length);
            console.log(results);
            return ListingsActions.searchPropertiesSuccess({ results });
          }),
          catchError(error => {
            console.error('❌ Erreur searchProperties:', error);
            return of(ListingsActions.searchPropertiesFailure({
              error: error.message || 'Erreur lors de la recherche'
            }));
          })
        )
      )
    )
  );

  /**
   * ============================
   * EFFECT: FILTER PROPERTIES (SANS DATES)
   * Déclenché par: filterProperties
   * Appelle: filterProperties() du service
   * Utilisé quand on N'a PAS checkIn/checkOut
   * ============================
   */
  filterProperties$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ListingsActions.filterProperties),
      exhaustMap(({ filters }) =>
        this.propertyService.filterProperties(filters).pipe(
          map(properties => {
            console.log('✅ Résultats filtrage (sans dates):', properties.length);
            return ListingsActions.filterPropertiesSuccess({ properties });
          }),
          catchError(error => {
            console.error('❌ Erreur filterProperties:', error);
            return of(ListingsActions.filterPropertiesFailure({
              error: error.message || 'Erreur lors du filtrage'
            }));
          })
        )
      )
    )
  );

  /**
   * ============================
   * EFFECT: LOAD PROPERTY DETAIL
   * Déclenché par: loadPropertyDetail
   * Appelle: getPropertyById() du service
   * ============================
   */
  loadPropertyDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ListingsActions.loadPropertyDetail),
      switchMap(({ id }) =>
        this.propertyService.getPropertyById(id).pipe(
          map(property => ListingsActions.loadPropertyDetailSuccess({ property })),
          catchError(error => {
            console.error('Erreur loadPropertyDetail:', error);
            return of(ListingsActions.loadPropertyDetailFailure({
              error: error.message || 'Erreur lors du chargement du détail'
            }));
          })
        )
      )
    )
  );
}
