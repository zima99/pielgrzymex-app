import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-admin-trip-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-trip-edit.html' 
})
export class AdminTripEditComponent implements OnInit {
  tripId: string = '';
  trip: any = {};
  isLoading: boolean = true;

  // 👇 NOWE ZMIENNE DO ZDJĘĆ
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  currentImageUrl: string = ''; 

  categoriesData = {
    youth: false,
    adults: false,
    state: false,
    family: false
  };

  private apiUrl = 'http://localhost:3000/api/admin'; 

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.tripId = this.route.snapshot.paramMap.get('id') || '';
    if (this.tripId) {
      this.loadTrip();
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

  loadTrip() {
    this.isLoading = true;
    this.http.get<any>(`${this.apiUrl}/trips/${this.tripId}`, this.getHeaders()).subscribe({
      next: (data) => {
        this.trip = data;
        
        // 👇 ZAPAMIĘTANIE OBECNEGO ZDJĘCIA
        this.currentImageUrl = this.trip.imageUrl;

        try {
          if (this.trip.startDate) this.trip.startDate = new Date(this.trip.startDate).toISOString().split('T')[0];
          if (this.trip.endDate) this.trip.endDate = new Date(this.trip.endDate).toISOString().split('T')[0];
        } catch (e) {}

        if (this.trip.categories && Array.isArray(this.trip.categories)) {
          this.categoriesData.youth = this.trip.categories.includes('Młodzieżowa');
          this.categoriesData.adults = this.trip.categories.includes('Dla dorosłych');
          this.categoriesData.state = this.trip.categories.includes('Stanowa');
          this.categoriesData.family = this.trip.categories.includes('Rodzinna');
        }
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.isLoading = false;
        this.navigateBack();
      }
    });
  }

  // 👇 NOWA FUNKCJA: WYBÓR PLIKU
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      
      // Tworzenie podglądu
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  saveChanges() {
    // 1. Walidacja
    if (!this.trip.name || !this.trip.price) {
      alert('Nazwa i Cena są wymagane!');
      return;
    }

    // 2. Kategorie do tablicy
    const categoriesArray: string[] = [];
    if (this.categoriesData.youth) categoriesArray.push('Młodzieżowa');
    if (this.categoriesData.adults) categoriesArray.push('Dla dorosłych');
    if (this.categoriesData.state) categoriesArray.push('Stanowa');
    if (this.categoriesData.family) categoriesArray.push('Rodzinna');

    // 3. Budowanie FormData (zamiast JSON)
    const formData = new FormData();
    formData.append('name', this.trip.name);
    formData.append('startLocation', this.trip.startLocation || '');
    formData.append('destination', this.trip.destination || '');
    formData.append('startDate', this.trip.startDate || '');
    formData.append('endDate', this.trip.endDate || '');
    formData.append('price', String(this.trip.price));
    formData.append('type', this.trip.type || 'inna');
    formData.append('spots', String(this.trip.spots || 0));
    formData.append('description', this.trip.description || '');
    
    // Tablice w FormData wysyłamy jako string JSON
    formData.append('categories', JSON.stringify(categoriesArray));

    // 👇 DODAJ PLIK JEŚLI JEST NOWY
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    // 4. Wysyłka
    this.http.put(`${this.apiUrl}/trips/${this.tripId}`, formData, this.getHeaders()).subscribe({
      next: () => {
        sessionStorage.setItem('adminSuccess', 'Zmiany w pielgrzymce zapisane!');
        this.navigateBack();
      },
      error: (err) => alert('Błąd: ' + (err.error?.message || err.message))
    });
  }

  deleteTrip() {
    if(!confirm('Czy na pewno chcesz usunąć tę pielgrzymkę?')) return;
    this.http.delete(`${this.apiUrl}/trips/${this.tripId}`, this.getHeaders()).subscribe({
      next: () => {
        sessionStorage.setItem('adminSuccess', 'Pielgrzymka usunięta.');
        this.navigateBack();
      },
      error: (err) => alert('Błąd: ' + err.message)
    });
  }

  cancel() { this.navigateBack(); }

  navigateBack() {
    this.router.navigate(['/admin'], { queryParams: { tab: 'trips' } }).then(() => {
      window.scrollTo(0, 0);
    });
  }
}