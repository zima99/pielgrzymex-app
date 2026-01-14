import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router'; // Dodaj Router do importów

@Component({
  selector: 'app-header', // Zapewne masz taki selektor
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css'] // Jeśli masz plik css
})
export class HeaderComponent {
  isMenuOpen: boolean = false; // 👇 Zmienna sterująca menu mobilnym

  constructor(private router: Router) {}

  // Sprawdzanie czy user jest zalogowany
  get isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  // Sprawdzanie czy to admin
  get isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.role === 'admin';
  }

  // 👇 Funkcja: Otwórz/Zamknij
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // 👇 Funkcja: Zamknij (używana po kliknięciu w link)
  closeMenu() {
    this.isMenuOpen = false;
  }

  logout() {
    localStorage.removeItem('user');
    this.closeMenu();
    this.router.navigate(['/logowanie']).then(() => {
      window.location.reload();
    });
  }
}