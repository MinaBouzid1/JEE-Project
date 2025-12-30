// src/app/store/listings/listings.reducer.ts

import { createReducer, on } from '@ngrx/store';
import * as ListingsActions from './listing.actions';
import {
  Property,
  PropertySearchResultDTO,
  PropertySearchFilters
} from '../../core/models/property.model';
import {PropertyCard} from "../../core/models/property-card.model";

//
/**
 * ============================
 * ÉTAT LISTINGS
 * ============================
 */
export interface ListingsState {
  allProperties: PropertyCard[];  // ← Changé de Property[] à PropertyCard[]
  searchResults: PropertySearchResultDTO[];
  filters: PropertySearchFilters;
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  totalElements: number;
}

/**
 * ============================
 * ÉTAT INITIAL
 * ============================
 */
export const initialState: ListingsState = {
  allProperties: [],
  searchResults: [],
  filters: {
    adults: 1,
    children: 0,
    babies: 0,
    pets: 0
  },
  loading: false,
  error: null,
  currentPage: 0,
  totalPages: 0,
  totalElements: 0
};

/**
 * ============================
 * REDUCER
 * ============================
 */
export const listingsReducer = createReducer(
  initialState,

  // Load All Properties
  on(ListingsActions.loadAllProperties, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(ListingsActions.loadAllPropertiesSuccess, (state, { properties }) => ({
    ...state,
    allProperties: properties,  // Directement properties, pas response.content
    searchResults: [],
    loading: false
  })),

  on(ListingsActions.loadAllPropertiesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Filter Properties (sans dates)
  on(ListingsActions.filterProperties, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(ListingsActions.filterPropertiesSuccess, (state, { properties }) => ({
    ...state,
    allProperties: properties,  // ✅ PropertyCard[]
    searchResults: [],  // Clear search results
    loading: false
  })),

  on(ListingsActions.filterPropertiesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Search Properties (avec dates)
  on(ListingsActions.searchProperties, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(ListingsActions.searchPropertiesSuccess, (state, { results }) => ({
    ...state,
    searchResults: results,  // ✅ PropertySearchResultDTO[]
    allProperties: [],  // Clear browse properties
    loading: false
  })),

  on(ListingsActions.searchPropertiesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Update Filters
  on(ListingsActions.updateFilters, (state, { filters }) => ({
    ...state,
    filters: { ...state.filters, ...filters }
  })),

  // Clear Filters
  on(ListingsActions.clearFilters, (state) => ({
    ...state,
    filters: {
      adults: 1,
      children: 0,
      babies: 0,
      pets: 0
    },
    searchResults: []
  }))
);
