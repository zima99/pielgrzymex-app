import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-admin-user-add',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-user-add.html'
})
export class AdminUserAddComponent {
  newUser = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
    isPremium: false
  };

  private apiUrl = 'http://localhost:3000/api/admin'; 

  constructor(private http: HttpClient, private router: Router) {}

  private getHeaders() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${user.token}` })
    };
  }

  saveUser() {
    if (!this.newUser.firstName || !this.newUser.lastName || !this.newUser.email || !this.newUser.password) {
      alert('Wypełnij wszystkie wymagane pola!');
      return;
    }
    if (this.newUser.password !== this.newUser.confirmPassword) {
      alert('Hasła muszą być identyczne!');
      return;
    }
    if (this.newUser.password.length < 6) {
      alert('Hasło musi mieć co najmniej 6 znaków.');
      return;
    }

    const payload = {
      firstName: this.newUser.firstName,
      lastName: this.newUser.lastName,
      email: this.newUser.email,
      password: this.newUser.password,
      role: this.newUser.role,
      isPremium: this.newUser.isPremium
    };

    this.http.post(`${this.apiUrl}/users`, payload, this.getHeaders()).subscribe({
      next: () => {
        // 👇 ZMIANA: Zapisujemy sukces w pamięci przeglądarki
        sessionStorage.setItem('adminSuccess', 'Użytkownik został pomyślnie dodany!');
        this.navigateBack(); 
      },
      error: (err) => {
        alert(err.error?.message || 'Błąd podczas tworzenia użytkownika');
      }
    });
  }

  cancel() {
    this.navigateBack();
  }

  navigateBack() {
    this.router.navigate(['/admin']).then(() => {
      window.scrollTo(0, 0);
    });
  }
}