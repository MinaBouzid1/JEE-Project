package com.rentaldapp.bookingservice.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PriceBreakdownDTO {
    private Double lockedPricePerNight;
    private Double baseAmount;
    private Double discountAmount;
    private Double cleaningFee;
    private Double petFee;
    private Double serviceFee;
    private Double totalAmount;
    private Double platformFeePercentage;
}