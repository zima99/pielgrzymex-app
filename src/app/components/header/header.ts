import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Ważne dla *ngIf
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  // Tutaj wskazujemy Twoje pliki:
  templateUrl: './header.html',
  // Jeśli nie masz pliku header.css, usuń poniższą linię, lub stwórz pusty plik header.css
  styleUrls: ['./header.css'] 
})
export class HeaderComponent {
  isMobileMenuOpen = false;

  toggleMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}