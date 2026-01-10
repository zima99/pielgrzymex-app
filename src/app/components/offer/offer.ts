import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <--- WAŻNE: Dodaj to do obsługi suwaków

@Component({
  selector: 'app-offer',
  standalone: true,
  imports: [CommonModule, FormsModule], // <--- Dodaj tutaj
  templateUrl: './offer.html',
  styleUrls: ['./offer.css']
})
export class OfferComponent {
  // Wartości domyślne dla suwaków
  priceValue: number = 2500;
  distanceValue: number = 50;
  
  // Funkcja pomocnicza do formatowania ceny (opcjonalna)
  formatLabel(value: number): string {
    if (value >= 15000) {
      return '15000+ zł';
    }
    return value + ' zł';
  }
}