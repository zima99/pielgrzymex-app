import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api/pielgrzymki';

  constructor(private http: HttpClient) { }

  getPilgrimages(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // <--- NOWA METODA
  getPilgrimageById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}