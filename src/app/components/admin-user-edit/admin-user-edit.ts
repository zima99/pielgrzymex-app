import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-admin-user-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-user-edit.html'
})
export class AdminUserEditComponent implements OnInit {
  userId: string = '';
  // Inicjalizujemy obiekt, żeby nie było błędów w HTML przed załadowaniem
  user: any = { role: 'user', isPremium: false, firstName: '', lastName: '', email: '' };
  isLoading: boolean = true;
  
  passwordData = {
    newPassword: '',
    confirmPassword: ''
  };

  private apiUrl = 'http://localhost:3000/api/admin';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef // Dodajemy detektor zmian
  ) {}

  // Gettery i settery dla checkboxów w HTML
  get isAdmin(): boolean { return this.user.role === 'admin'; }
  set isAdmin(value: boolean) { this.user.role = value ? 'admin' : 'user'; }

  get isPremium(): boolean { return this.user.isPremium; }
  set isPremium(value: boolean) { this.user.isPremium = value; }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    console.log('--- START EDYCJI USERA --- ID:', this.userId);

    if (this.userId) {
      this.loadUser();
    } else {
      alert('Brak ID w adresie URL');
      this.navigateBack();
    }
  }

  private getHeaders() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return {
      headers: new HttpHeaders({ 
        'Authorization': `Bearer ${user.token}`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      })
    };
  }

  loadUser() {
    this.isLoading = true;
    console.log('Wysyłam zapytanie do:', `${this.apiUrl}/users/${this.userId}`);

    this.http.get<any>(`${this.apiUrl}/users/${this.userId}`, this.getHeaders()).subscribe({
      next: (data) => {
        console.log('✅ Odebrano dane użytkownika:', data);
        this.user = data;
        this.isLoading = false;
        this.cdr.detectChanges(); // Wymuś odświeżenie widoku
      },
      error: (err) => {
        console.error('❌ Błąd pobierania:', err);
        alert('Nie udało się pobrać danych użytkownika. Sprawdź backend.');
        this.isLoading = false;
        this.navigateBack();
      }
    });
  }

  saveChanges() {
    if (!this.user.firstName || !this.user.lastName || !this.user.email) {
      alert('Imię, Nazwisko i Email są wymagane!');
      return;
    }

    if (this.passwordData.newPassword) {
      if (this.passwordData.newPassword !== this.passwordData.confirmPassword) {
        alert('Hasła nie są identyczne!');
        return;
      }
      this.user.password = this.passwordData.newPassword;
    }

    this.http.put(`${this.apiUrl}/users/${this.userId}`, this.user, this.getHeaders()).subscribe({
      next: () => {
        sessionStorage.setItem('adminSuccess', 'Dane użytkownika zaktualizowane!');
        this.navigateBack();
      },
      error: (err) => alert('Błąd zapisu: ' + err.message)
    });
  }

  deleteUser() {
    if(!confirm('Czy usunąć tego użytkownika?')) return;
    this.http.delete(`${this.apiUrl}/users/${this.userId}`, this.getHeaders()).subscribe({
      next: () => {
        sessionStorage.setItem('adminSuccess', 'Użytkownik usunięty.');
        this.navigateBack();
      },
      error: (err) => alert('Błąd: ' + err.message)
    });
  }

  cancel() { this.navigateBack(); }

  navigateBack() {
    this.router.navigate(['/admin'], { queryParams: { tab: 'users' } });
  }
}