package com.rentaldapp.bookingservice.controller;

import com.rentaldapp.bookingservice.model.dto.ReviewDTO;
import com.rentaldapp.bookingservice.service.ReviewService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/reviews")
@CrossOrigin(origins = "*")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping
    public ResponseEntity<ReviewDTO> createReview(
            @Valid @RequestBody ReviewDTO reviewDTO,
            Authentication authentication) {
        Integer userId = (Integer) authentication.getPrincipal();
        ReviewDTO review = reviewService.createReview(reviewDTO, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(review);
    }

    @GetMapping("/reservation/{reservationId}")
    public ResponseEntity<ReviewDTO> getReviewByReservationId(@PathVariable Integer reservationId) {
        ReviewDTO review = reviewService.getReviewByReservationId(reservationId);
        return ResponseEntity.ok(review);
    }

    @GetMapping("/property/{propertyId}")
    public ResponseEntity<List<ReviewDTO>> getPropertyReviews(@PathVariable Integer propertyId) {
        List<ReviewDTO> reviews = reviewService.getReviewsByPropertyId(propertyId);
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/property/{propertyId}/rating")
    public ResponseEntity<Map<String, Object>> getPropertyRating(@PathVariable Integer propertyId) {
        Double averageRating = reviewService.getAverageRatingByPropertyId(propertyId);
        Long totalReviews = reviewService.getTotalReviewsCountByPropertyId(propertyId);

        Map<String, Object> response = new HashMap<>();
        response.put("averageRating", averageRating);
        response.put("totalReviews", totalReviews);

        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{reviewId}/visibility")
    public ResponseEntity<ReviewDTO> updateVisibility(
            @PathVariable Integer reviewId,
            @RequestParam Boolean isVisible) {
        ReviewDTO review = reviewService.updateReviewVisibility(reviewId, isVisible);
        return ResponseEntity.ok(review);
    }
}