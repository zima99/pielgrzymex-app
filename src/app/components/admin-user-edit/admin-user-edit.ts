import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-admin-user-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-user-edit.html',
  styleUrls: ['./admin-user-edit.css']
})
export class AdminUserEditComponent implements OnInit {
  userId: string = '';
  user: any = {};
  isLoading: boolean = true; 

  // Dane do zmiany hasła
  passwordData = {
    newPassword: '',
    confirmPassword: ''
  };

  // Checkboxy (teraz niezależne od siebie)
  isAdmin: boolean = false;
  isPremium: boolean = false;

  editingField: string | null = null;

  // Adres lokalny
  private apiUrl = 'http://localhost:3000/api/admin'; 

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    if (this.userId) {
      this.loadUser();
    }
  }

  private getHeaders() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${user.token}` })
    };
  }

  loadUser() {
    this.isLoading = true;
    
    this.http.get<any>(`${this.apiUrl}/users/${this.userId}`, this.getHeaders()).subscribe({
      next: (data) => {
        this.user = data;
        
        // --- MAPOWANIE DANYCH Z BAZY NA CHECKBOXY ---
        this.isAdmin = this.user.role === 'admin';
        this.isPremium = this.user.isPremium; // To jest teraz pole boolean (true/false)
        
        this.isLoading = false;
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        alert('Błąd pobierania danych');
        this.router.navigate(['/admin']);
      }
    });
  }

  startEdit(field: string) {
    this.editingField = field;
  }

  stopEdit() {
    this.editingField = null;
  }

  saveChanges() {
    // 1. Walidacja haseł
    if (this.passwordData.newPassword || this.passwordData.confirmPassword) {
      if (this.passwordData.newPassword !== this.passwordData.confirmPassword) {
        alert('Hasła muszą być identyczne!');
        return;
      }
      if (this.passwordData.newPassword.length < 6) {
        alert('Nowe hasło jest za krótkie!');
        return;
      }
    }

    // 2. Przygotowanie Payloadu
    const payload: any = {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      
      // Rola zależy od checkboxa Admin
      role: this.isAdmin ? 'admin' : 'user',
      
      // Premium wysyłamy jako osobne pole boolean
      isPremium: this.isPremium
    };

    // Dodaj hasło tylko jeśli zostało wpisane
    if (this.passwordData.newPassword) {
      payload.password = this.passwordData.newPassword;
    }

    // 3. Wysyłka
    this.http.put(`${this.apiUrl}/users/${this.userId}`, payload, this.getHeaders()).subscribe({
      next: () => {
        alert('Zapisano zmiany!');
        this.router.navigate(['/admin']);
      },
      error: (err) => alert('Błąd zapisu: ' + err.message)
    });
  }

  deleteUser() {
    if(!confirm('Czy na pewno chcesz BEZPOWROTNIE usunąć tego użytkownika?')) return;

    this.http.delete(`${this.apiUrl}/users/${this.userId}`, this.getHeaders()).subscribe({
      next: () => {
        alert('Użytkownik został usunięty.');
        this.router.navigate(['/admin']);
      },
      error: (err) => alert('Błąd usuwania: ' + err.message)
    });
  }

  cancel() {
    this.router.navigate(['/admin']);
  }
}