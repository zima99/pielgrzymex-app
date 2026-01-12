import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // 👇 Upewnij się, że ten adres jest poprawny
  private apiUrl = 'https://pielgrzymex-api.onrender.com/api/auth';

  // 👇 TE DWIE LINIJKI SĄ KLUCZOWE DLA NAPRAWIENIA BŁĘDU 👇
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>; 
  // 👆 Bez tego Header nie zadziała! 👆

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('user');
    this.currentUserSubject = new BehaviorSubject<any>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // --- REJESTRACJA ---
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData).pipe(
      tap((response: any) => {
        if (response && response.token) {
          localStorage.setItem('user', JSON.stringify(response));
          this.currentUserSubject.next(response);
        }
      })
    );
  }

  // --- LOGOWANIE ---
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((user: any) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSubject.next(user);
      })
    );
  }

  // --- WYLOGOWANIE ---
  logout() {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  // Metoda pomocnicza (dla kompatybilności wstecznej)
  getCurrentUserValue() {
    return this.currentUserSubject.value;
  }
}