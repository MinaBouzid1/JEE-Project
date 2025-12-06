// src/app/store/listings/listings.selectors.ts

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ListingsState } from './listing.reducer';

/**
 * ============================
 * SELECTOR DE FEATURE
 * ============================
 */
export const selectListingsState = createFeatureSelector<ListingsState>('listings');

/**
 * ============================
 * SÉLECTEURS : PROPERTIES (liste complète)
 * ============================
 */
export const selectAllProperties = createSelector(
  selectListingsState,
  (state: ListingsState) => state.properties
);

export const selectTotalProperties = createSelector(
  selectListingsState,
  (state: ListingsState) => state.totalProperties
);

/**
 * ============================
 * SÉLECTEURS : SEARCH RESULTS (avec filtres)
 * ============================
 */
export const selectSearchResults = createSelector(
  selectListingsState,
  (state: ListingsState) => state.searchResults
);

export const selectHasSearchResults = createSelector(
  selectSearchResults,
  (results) => results.length > 0
);

/**
 * ============================
 * SÉLECTEUR : PROPERTY DETAIL
 * ============================
 */
export const selectSelectedProperty = createSelector(
  selectListingsState,
  (state: ListingsState) => state.selectedProperty
);

/**
 * ============================
 * SÉLECTEURS : FILTERS
 * ============================
 */
export const selectFilters = createSelector(
  selectListingsState,
  (state: ListingsState) => state.filters
);

export const selectHasActiveFilters = createSelector(
  selectFilters,
  (filters) => {
    return !!(
      filters.city ||
      filters.country ||
      filters.checkIn ||
      filters.checkOut ||
      filters.propertyType ||
      filters.minPrice ||
      filters.maxPrice ||
      (filters.amenityIds && filters.amenityIds.length > 0)
    );
  }
);

/**
 * ============================
 * SÉLECTEURS : LOADING STATES
 * ============================
 */
export const selectListingsLoading = createSelector(
  selectListingsState,
  (state: ListingsState) => state.loading
);

export const selectPropertyDetailLoading = createSelector(
  selectListingsState,
  (state: ListingsState) => state.loadingDetail
);

/**
 * ============================
 * SÉLECTEUR : ERROR
 * ============================
 */
export const selectListingsError = createSelector(
  selectListingsState,
  (state: ListingsState) => state.error
);

/**
 * ============================
 * SÉLECTEUR : DISPLAY MODE
 * Détermine quel contenu afficher (properties vs searchResults)
 * ============================
 */

export const selectDisplayedListings = createSelector(
  selectListingsState,
  (state: ListingsState) => {
    return state.isSearchMode ? state.searchResults : state.properties;
  }
);
