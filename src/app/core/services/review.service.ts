// src/app/core/services/review.service.ts
// ✅ VERSION FINALE CORRIGÉE

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PropertyReviewStats } from '../models/review-stats.model';
import { Review, ReviewRequest, ReviewUpdateRequest } from "../models/review.model";
import { environment } from "../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class ReviewService {

  // ✅ URL complète
  private readonly baseUrl = `${environment.apiUrl}${environment.services.review}`;

  constructor(private http: HttpClient) {
    console.log('✅ ReviewService initialized with baseUrl:', this.baseUrl);
  }

  // Créer un avis
  createReview(request: ReviewRequest): Observable<Review> {
    return this.http.post<Review>(this.baseUrl, request);
  }

  // ✅ CORRIGÉ : Récupérer avis d'une property
  getPropertyReviews(propertyId: number): Observable<Review[]> {
    const url = `${this.baseUrl}/property/${propertyId}`;
    console.log('✅ Fetching reviews from:', url);
    return this.http.get<Review[]>(url);
  }

  // Récupérer statistiques
  getPropertyStats(propertyId: number): Observable<PropertyReviewStats> {
    const url = `${this.baseUrl}/property/${propertyId}/stats`;
    console.log('✅ Fetching stats from:', url);
    return this.http.get<PropertyReviewStats>(url);
  }

  // Note moyenne
  getAverageRating(propertyId: number): Observable<{ averageRating: number }> {
    return this.http.get<{ averageRating: number }>(
      `${this.baseUrl}/property/${propertyId}/average-rating`
    );
  }

  // ✅ CORRIGÉ : Modifier un avis
  updateReview(id: number, request: ReviewUpdateRequest, userId: number): Observable<Review> {
    const params = new HttpParams().set('userId', userId);
    return this.http.put<Review>(`${this.baseUrl}/${id}`, request, { params });
  }

  // ✅ CORRIGÉ : Supprimer un avis
  deleteReview(id: number, userId: number): Observable<any> {
    const params = new HttpParams().set('userId', userId);
    return this.http.delete(`${this.baseUrl}/${id}`, { params });
  }
}
