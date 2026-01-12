import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-panel.html',
  styleUrls: ['./admin-panel.css']
})
export class AdminPanelComponent implements OnInit {
  users: any[] = [];
  activeTab: string = 'users';
  isLoading: boolean = false;
  
  // Upewnij się, że adres jest poprawny
  private apiUrl = 'https://pielgrzymex-api.onrender.com/api/admin';

  constructor(
    private http: HttpClient, 
    private router: Router,
    private cdr: ChangeDetectorRef // Narzędzie do ręcznego odświeżania widoku
  ) {}

  ngOnInit() {
    // Odpalamy pobieranie od razu przy wejściu na stronę
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
    console.log('--- Rozpoczynam pobieranie użytkowników ---');
    this.isLoading = true;
    
    this.http.get<any[]>(`${this.apiUrl}/users`, this.getHeaders()).subscribe({
      next: (data) => {
        console.log('✅ Pobrane dane:', data);
        this.users = data;
        this.isLoading = false;
        
        // KLUCZOWE: Wymuszenie aktualizacji widoku HTML
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('❌ Błąd:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
        
        if (err.status === 401 || err.status === 403) {
          alert('Sesja wygasła lub brak uprawnień. Zaloguj się ponownie.');
          this.router.navigate(['/']);
        }
      }
    });
  }

  // --- AKCJE ---

  changeRole(user: any, newRole: string) {
    if(!confirm(`Czy na pewno zmienić rolę użytkownika ${user.email} na ${newRole}?`)) return;

    this.http.put(`${this.apiUrl}/users/${user._id}`, { role: newRole }, this.getHeaders())
      .subscribe({
        next: () => {
          this.loadUsers(); // Odśwież listę po zmianie
        },
        error: (err) => alert('Błąd podczas zmiany roli')
      });
  }

  deleteUser(id: string) {
    if(!confirm('Czy na pewno usunąć tego użytkownika? Operacja jest nieodwracalna.')) return;

    this.http.delete(`${this.apiUrl}/users/${id}`, this.getHeaders()).subscribe({
      next: () => {
        this.loadUsers(); // Odśwież listę po usunięciu
      },
      error: (err) => alert('Błąd usuwania użytkownika')
    });
  }
}