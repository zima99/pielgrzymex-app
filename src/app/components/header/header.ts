import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router'; // Dodano Router
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent implements OnInit {
  currentUser: any = null;

  // Wstrzykujemy Router w konstruktorze
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Nasłuchujemy zmian użytkownika (zalogowany/wylogowany)
    this.authService.currentUser.subscribe((user: any) => {
      this.currentUser = user;
    });
  }

  logout() {
    // 1. Wyczyść dane logowania
    this.authService.logout();
    
    // 2. Przekieruj na stronę główną
    this.router.navigate(['/']);
  }
}