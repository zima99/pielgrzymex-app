import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-panel.html',
  styleUrls: ['./admin-panel.css']
})
export class AdminPanelComponent implements OnInit {
  users: any[] = [];
  activeTab: string = 'users';
  isLoading: boolean = false;
  private apiUrl = 'http://localhost:3000/api/admin';

  constructor(
    private http: HttpClient, 
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  switchTab(tabName: string) {
    this.activeTab = tabName;
    if (tabName === 'users') {
      this.loadUsers();
    }
  }

  private getHeaders() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${user.token}`
      })
    };
  }

  loadUsers() {
    this.isLoading = true;
    this.http.get<any[]>(`${this.apiUrl}/users`, this.getHeaders()).subscribe({
      next: (data) => {
        this.users = data;
        this.isLoading = false;
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        this.isLoading = false;
        this.cdr.detectChanges();
        if (err.status === 401 || err.status === 403) {
          this.router.navigate(['/']);
        }
      }
    });
  }

  // Zostawiamy changeRole, bo może się przydać do szybkich zmian z listy (opcjonalnie)
  // Jeśli nie chcesz, możesz też usunąć.
  changeRole(user: any, newRole: string) {
    if(!confirm(`Zmienić rolę na ${newRole}?`)) return;
    this.http.put(`${this.apiUrl}/users/${user._id}`, { role: newRole }, this.getHeaders())
      .subscribe({ next: () => this.loadUsers() });
  }
}