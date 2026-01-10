import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  // TUTAJ BYŁ BŁĄD: Musi być krótka nazwa, taka jak Twój plik
  templateUrl: './hero.html', 
  styleUrls: ['./hero.css'] // Jeśli nie masz pliku css, usuń tę linijkę
})
export class HeroComponent {}