import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // 👈 Dodano ChangeDetectorRef
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html'
})
export class HomeComponent implements OnInit {
  isLoading: boolean = true;
  
  upcomingTrips: any[] = [];
  busTrips: any[] = [];
  planeTrips: any[] = [];

  private apiUrl = 'http://localhost:3000/api/trips';

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef // 👈 Wstrzykujemy detektor
  ) {}

  ngOnInit() {
    window.scrollTo(0, 0);
    this.loadTrips();
  }

  loadTrips() {
    this.isLoading = true;
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        console.log('Dane pobrane na Home:', data.length); // Log diagnostyczny

        // Sortowanie i filtrowanie
        this.upcomingTrips = data.slice(0, 3);
        this.busTrips = data.filter(t => t.type === 'autokarowa').slice(0, 3);
        this.planeTrips = data.filter(t => t.type === 'samolotowa').slice(0, 3);

        this.isLoading = false;
        
        // 👇 WYMUSZENIE ODŚWIEŻENIA WIDOKU
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Błąd pobierania:', err);
        this.isLoading = false;
        this.cdr.detectChanges(); // Tutaj też, żeby loader zniknął
      }
    });
  }
}