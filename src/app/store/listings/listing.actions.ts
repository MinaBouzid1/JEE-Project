// src/app/store/listings/listing.actions.ts

import { createAction, props } from '@ngrx/store';
import {
  Property,
  PropertySearchResultDTO,
  PropertySearchFilters
} from '../../core/models/property.model';
import {PropertyCard} from "../../core/models/property-card.model";

/**
 * ============================
 * ACTIONS LOAD ALL PROPERTIES (Page /listings sans filtres)
 * ============================
 */
export const loadAllProperties = createAction(
  '[Listings] Load All Properties',
  props<{ page: number; size: number }>()
);

export const loadAllPropertiesSuccess = createAction(
  '[Listings] Load All Properties Success',
  props<{ properties: PropertyCard[]; total: number }>()  // ✅ PropertyCard au lieu de Property
);

export const loadAllPropertiesFailure = createAction(
  '[Listings] Load All Properties Failure',
  props<{ error: string }>()
);

/**
 * ============================
 * ACTIONS SEARCH PROPERTIES (Page /listings avec filtres + DATES)
 * ============================
 */
export const searchProperties = createAction(
  '[Listings] Search Properties',
  props<{ filters: PropertySearchFilters }>()
);

export const searchPropertiesSuccess = createAction(
  '[Listings] Search Properties Success',
  props<{ results: PropertySearchResultDTO[] }>()
);

export const searchPropertiesFailure = createAction(
  '[Listings] Search Properties Failure',
  props<{ error: string }>()
);

/**
 * ============================
 * ACTIONS FILTER PROPERTIES (Page /listings avec filtres SANS dates)
 * ============================
 */
export const filterProperties = createAction(
  '[Listings] Filter Properties',
  props<{ filters: PropertySearchFilters }>()
);

export const filterPropertiesSuccess = createAction(
  '[Listings] Filter Properties Success',
  props<{ properties: PropertyCard[] }>()  // ✅ PropertyCard au lieu de Property
);

export const filterPropertiesFailure = createAction(
  '[Listings] Filter Properties Failure',
  props<{ error: string }>()
);

/**
 * ============================
 * ACTIONS LOAD PROPERTY DETAIL
 * ============================
 */
export const loadPropertyDetail = createAction(
  '[Listings] Load Property Detail',
  props<{ id: number }>()
);

export const loadPropertyDetailSuccess = createAction(
  '[Listings] Load Property Detail Success',
  props<{ property: Property }>()
);

export const loadPropertyDetailFailure = createAction(
  '[Listings] Load Property Detail Failure',
  props<{ error: string }>()
);

/**
 * ============================
 * ACTIONS UPDATE FILTERS
 * ============================
 */
export const updateFilters = createAction(
  '[Listings] Update Filters',
  props<{ filters: Partial<PropertySearchFilters> }>()
);

export const clearFilters = createAction('[Listings] Clear Filters');

/**
 * ============================
 * ACTIONS CLEAR ERRORS
 * ============================
 */
export const clearError = createAction('[Listings] Clear Error');
