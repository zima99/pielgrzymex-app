import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Ważne dla *ngIf
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';

Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent implements OnInit {
  currentUser: any = null; // Tu będziemy trzymać dane usera (np. imię)

  constructor(public authService: AuthService) {} // Public, żeby html widział

  ngOnInit() {
    // Nasłuchujemy zmian (czy ktoś się zalogował/wylogował?)
    this.authService.user$.subscribe(user => {
      this.currentUser = user;
    });
  }

  logout() {
    this.authService.logout();
  }
}