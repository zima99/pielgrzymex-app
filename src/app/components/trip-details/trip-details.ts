import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // 👈 Dodano ChangeDetectorRef
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-trip-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './trip-details.html'
})
export class TripDetailsComponent implements OnInit {
  trip: any = null;
  isLoading: boolean = true;
  tripId: string = '';

  private apiUrl = 'http://localhost:3000/api/trips';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cdr: ChangeDetectorRef // 👈 Wstrzykujemy detektor zmian
  ) {}

  ngOnInit() {
    window.scrollTo(0, 0);
    this.tripId = this.route.snapshot.paramMap.get('id') || '';
    console.log('ID z URL:', this.tripId); // Log diagnostyczny
    
    if (this.tripId) {
      this.loadTripDetails();
    }
  }

  loadTripDetails() {
    this.isLoading = true;
    console.log('Wysyłam zapytanie do:', `${this.apiUrl}/${this.tripId}`);

    this.http.get<any>(`${this.apiUrl}/${this.tripId}`).subscribe({
      next: (data) => {
        console.log('✅ Odebrano szczegóły:', data); // Zobaczysz to w konsoli (F12)
        this.trip = data;
        
        this.isLoading = false;
        this.cdr.detectChanges(); // 👈 KOPNIĘCIE ANGULARA, ŻEBY ODŚWIEŻYŁ WIDOK
      },
      error: (err) => {
        console.error('❌ Błąd pobierania:', err);
        this.isLoading = false;
        this.cdr.detectChanges(); // Tutaj też
      }
    });
  }
}