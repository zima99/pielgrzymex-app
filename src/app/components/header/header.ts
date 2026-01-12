import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth'; // Upewnij się, że ścieżka jest ok

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent implements OnInit {
  currentUser: any = null; // Ta zmienna steruje widocznością przycisków!

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // 1. Subskrybuj zmiany użytkownika (reakcja na logowanie/wylogowanie)
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      // Debugowanie: Zobacz w konsoli (F12) co tu siedzi
      console.log('Aktualny użytkownik w nagłówku:', this.currentUser);
    });
  }

  logout() {
    this.authService.logout();
  }
}