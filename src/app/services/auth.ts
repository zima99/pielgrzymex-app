import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { ApiService } from './api'; // Użyjemy adresu URL z Twojego ApiService

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // UWAGA: Musisz skopiować ten adres ze swojego api.service.ts (tylko część główną bez /pielgrzymki)
  // Jeśli w api.ts masz '.../api/pielgrzymki', to tu daj '.../api/auth'
  private apiUrl = 'https://zima99.onrender.com/api/auth'; 
  
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable(); // Inne komponenty mogą nasłuchiwać czy ktoś jest zalogowany

  constructor(private http: HttpClient) {
    this.checkLoginStatus();
  }

  // Sprawdzamy przy starcie aplikacji czy mamy token w kieszeni
  private checkLoginStatus() {
    const user = localStorage.getItem('user');
    if (user) {
      this.userSubject.next(JSON.parse(user));
    }
  }

  // Rejestracja
  register(userData: any) {
    return this.http.post(`${this.apiUrl}/register`, userData).pipe(
      tap((response: any) => {
        // Po udanej rejestracji od razu logujemy (zapisujemy token)
        this.saveUser(response);
      })
    );
  }

  // Logowanie
  login(credentials: any) {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        this.saveUser(response);
      })
    );
  }

  // Wylogowanie
  logout() {
    localStorage.removeItem('user'); // Usuwamy przepustkę
    this.userSubject.next(null);
  }

  // Pomocnicza: Zapisz dane w przeglądarce
  private saveUser(data: any) {
    localStorage.setItem('user', JSON.stringify(data));
    this.userSubject.next(data);
  }

  // Pomocnicza: Pobierz obecnego usera
  getCurrentUser() {
    return this.userSubject.value;
  }
}