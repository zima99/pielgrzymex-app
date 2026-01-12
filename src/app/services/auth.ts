import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Pamiętaj o poprawnym adresie API
  private apiUrl = 'https://pielgrzymex-api.onrender.com/api/auth';

  // 1. Źródło prawdy o użytkowniku (BehaviorSubject)
  private currentUserSubject: BehaviorSubject<any>;
  
  // 2. Publiczny strumień, do którego podpina się Header
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    // Przy starcie sprawdzamy localStorage
    const storedUser = localStorage.getItem('user');
    this.currentUserSubject = new BehaviorSubject<any>(storedUser ? JSON.parse(storedUser) : null);
    
    // Udostępniamy to jako Observable
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
        // Zapisz usera w przeglądarce
        localStorage.setItem('user', JSON.stringify(user));
        // Powiadom całą aplikację
        this.currentUserSubject.next(user);
      })
    );
  }

  // --- WYLOGOWANIE ---
  logout() {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null); // Powiadom, że nikt nie jest zalogowany
  }

  // Metoda pomocnicza
  getCurrentUserValue() {
    return this.currentUserSubject.value;
  }
}