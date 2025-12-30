export interface Review {
  id: number;
  reservationId: number;
  userId: number;
  propertyId: number;
  reviewText: string;
  ratingValue: number;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
  guestName?: string;
  propertyTitle?: string;
}

export interface ReviewRequest {
  reservationId: number;
  userId: number;
  propertyId: number;
  reviewText: string;
  ratingValue: number;
}

export interface ReviewUpdateRequest {
  reviewText?: string;
  isVisible?: boolean;
}
