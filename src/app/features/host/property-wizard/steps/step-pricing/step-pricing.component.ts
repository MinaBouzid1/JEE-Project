// src/app/features/host/property-wizard/steps/step-pricing/step-pricing.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-step-pricing',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSliderModule
  ],
  templateUrl: './step-pricing.component.html',
  styleUrl: './step-pricing.component.scss'
})
export class StepPricingComponent {
  @Input() form!: FormGroup;

  /**
   * Calculate estimated monthly earnings
   */
  getEstimatedEarnings(): number {
    const pricePerNight = this.form.get('pricePerNight')?.value || 0;
    const occupancyRate = 0.7; // 70% occupancy
    return pricePerNight * 30 * occupancyRate;
  }
}
