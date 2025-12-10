// src/app/store/listings/listings.reducer.ts

import { createReducer, on } from '@ngrx/store';
import * as ListingsActions from './listing.actions';
import {
  Property,
  PropertySearchResultDTO,
  PropertySearchFilters
} from '../../core/models/property.model';

/**
 * ============================
 * STATE LISTINGS
 * ============================
 */
export interface ListingsState {

  isSearchMode: boolean; // true si searchResults actifs

  // Liste des properties (accès direct /listings)
  properties: Property[];
  totalProperties: number;

  // Résultats de recherche (avec filtres)
  searchResults: PropertySearchResultDTO[];

  // Property sélectionnée (page détail)
  selectedProperty: Property | null;

  // Filtres actifs
  filters: PropertySearchFilters;

  // États de chargement
  loading: boolean;
  loadingDetail: boolean;

  // Erreurs
  error: string | null;
}

/**
 * ============================
 * ÉTAT INITIAL
 * ============================
 */
export const initialState: ListingsState = {
  isSearchMode : false,
  properties: [],
  totalProperties: 0,
  searchResults: [],
  selectedProperty: null,
  filters: {
    adults: 1,
    children: 0,
    babies: 0,
    pets: 0
  },
  loading: false,
  loadingDetail: false,
  error: null
};

/**
 * ============================
 * REDUCER LISTINGS
 * ============================
 */
export const listingsReducer = createReducer(
  initialState,

  // ========================================
  // LOAD ALL PROPERTIES (sans filtres)
  // ========================================
  on(ListingsActions.loadAllProperties, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(ListingsActions.loadAllPropertiesSuccess, (state, { properties, total }) => ({
    ...state,
    properties,
    totalProperties: total,
    isSearchMode: false, // ✅ Mode browse activé
    loading: false,
    error: null
  })),

  on(ListingsActions.loadAllPropertiesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // ========================================
  // SEARCH PROPERTIES (avec filtres)
  // ========================================
  on(ListingsActions.searchProperties, (state, { filters }) => ({
    ...state,
    filters: { ...state.filters, ...filters },
    loading: true,
    error: null
  })),

  on(ListingsActions.searchPropertiesSuccess, (state, { results }) => ({
    ...state,
    searchResults: results,
    isSearchMode: true, // ✅ Mode recherche activé
    loading: false,
    error: null
  })),



  on(ListingsActions.searchPropertiesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  // FILTER PROPERTIES SUCCESS
  on(ListingsActions.filterPropertiesSuccess, (state, { properties }) => ({
    ...state,
    properties: properties,              // ✅ Stocke les properties filtrées
    totalProperties: properties.length,  // ✅ Met à jour le total
    isSearchMode: false,                 // ✅ Reste en mode browse
    loading: false,
    error: null

  })),

  // ========================================
  // LOAD PROPERTY DETAIL
  // ========================================
  on(ListingsActions.loadPropertyDetail, (state) => ({
    ...state,
    loadingDetail: true,
    error: null
  })),

  on(ListingsActions.loadPropertyDetailSuccess, (state, { property }) => ({
    ...state,
    selectedProperty: property,
    loadingDetail: false,
    error: null
  })),

  on(ListingsActions.loadPropertyDetailFailure, (state, { error }) => ({
    ...state,
    loadingDetail: false,
    error
  })),

  // ========================================
  // UPDATE FILTERS
  // ========================================
  on(ListingsActions.updateFilters, (state, { filters }) => ({
    ...state,
    filters: { ...state.filters, ...filters }
  })),

  on(ListingsActions.clearFilters, (state) => ({
    ...state,
    filters: initialState.filters
  })),

  // ========================================
  // CLEAR ERROR
  // ========================================
  on(ListingsActions.clearError, (state) => ({
    ...state,
    error: null
  }))

);
