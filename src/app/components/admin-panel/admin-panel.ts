import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule], // Dodaj FormsModule jeśli będziesz chciał edytować formularzem
  templateUrl: './admin-panel.html',
  styleUrls: ['./admin-panel.css']
})
export class AdminPanelComponent implements OnInit {
  users: any[] = [];
  activeTab: string = 'users'; // 'users' albo 'trips'
  
  // URL do API (zmień na swój z Rendera!)
  private apiUrl = 'https://pielgrzymex-api.onrender.com/api/admin';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadUsers();
  }

  // Pobierz token z localStorage, żeby udowodnić bycie adminem
  private getHeaders() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${user.token}`
      })
    };
  }

  loadUsers() {
    this.http.get<any[]>(`${this.apiUrl}/users`, this.getHeaders()).subscribe({
      next: (data) => this.users = data,
      error: (err) => console.error('Brak dostępu (czy jesteś adminem?)', err)
    });
  }

  // Zmiana roli (np. na Premium)
  changeRole(user: any, newRole: string) {
    if(!confirm(`Czy na pewno zmienić rolę ${user.email} na ${newRole}?`)) return;

    this.http.put(`${this.apiUrl}/users/${user._id}`, { role: newRole }, this.getHeaders())
      .subscribe({
        next: () => {
          alert('Zmieniono rolę!');
          this.loadUsers(); // Odśwież listę
        },
        error: (err) => alert('Błąd edycji')
      });
  }

  deleteUser(id: string) {
    if(!confirm('Czy na pewno usunąć tego użytkownika? To nieodwracalne.')) return;

    this.http.delete(`${this.apiUrl}/users/${id}`, this.getHeaders()).subscribe({
      next: () => {
        alert('Usunięto.');
        this.loadUsers();
      },
      error: (err) => alert('Błąd usuwania')
    });
  }
}