import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // <--- Dodano ChangeDetectorRef
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './details.html',
  styleUrls: ['./details.css']
})
export class DetailsComponent implements OnInit {
  trip: any = null;
  isLoading = true; // Zaczynamy od ładowania

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private cdr: ChangeDetectorRef // <--- Wstrzykujemy detektor zmian
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('1. ID z URL:', id);

    if (id) {
      this.apiService.getPilgrimageById(id).subscribe({
        next: (data) => {
          console.log('2. Otrzymane dane (SUROWE):', data);

          this.trip = data;      // Przypisujemy dane
          this.isLoading = false; // Wyłączamy kółko
          
          // !!! KLUCZOWE: Wymuszamy odświeżenie widoku !!!
          this.cdr.detectChanges(); 
        },
        error: (err) => {
          console.error('3. Błąd:', err);
          this.isLoading = false;
          this.cdr.detectChanges(); // W razie błędu też odświeżamy
        }
      });
    } else {
      this.isLoading = false;
    }
  }
}