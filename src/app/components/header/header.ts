import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // 👇 TUTAJ BYŁ BŁĄD. Dodaliśmy ": any" przy userze
    this.authService.currentUser.subscribe((user: any) => {
      this.currentUser = user;
    });
  }

  logout() {
    this.authService.logout();
  }
}