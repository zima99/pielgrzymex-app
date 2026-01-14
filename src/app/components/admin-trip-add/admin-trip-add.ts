import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-admin-trip-add',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-trip-add.html'
})
export class AdminTripAddComponent {
  trip = {
    name: '',
    startLocation: '',
    destination: '',
    startDate: '',
    endDate: '',
    price: null,
    type: 'autokarowa',
    spots: 50,
    description: ''
  };

  categoriesData = {
    youth: false, adults: false, state: false, family: false
  };

  // 👇 ZMIENNA NA PLIK
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;

  private apiUrl = 'http://localhost:3000/api/admin'; 

  constructor(private http: HttpClient, private router: Router) {}

  private getHeaders() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    // 👇 WAŻNE: Przy FormData NIE ustawiamy Content-Type ręcznie!
    // Angular sam ustawi multipart/form-data z odpowiednim boundary
    return {
      headers: new HttpHeaders({ 
        'Authorization': `Bearer ${user.token}`
      })
    };
  }

  // 👇 OBSŁUGA WYBORU PLIKU
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      
      // Podgląd
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  saveTrip() {
    if (!this.trip.name || !this.trip.startLocation || !this.trip.destination || !this.trip.startDate || !this.trip.endDate || !this.trip.price) {
      alert('Wypełnij wszystkie wymagane pola!');
      return;
    }

    // Kategorie -> Array
    const categoriesArray: string[] = [];
    if (this.categoriesData.youth) categoriesArray.push('Młodzieżowa');
    if (this.categoriesData.adults) categoriesArray.push('Dla dorosłych');
    if (this.categoriesData.state) categoriesArray.push('Stanowa');
    if (this.categoriesData.family) categoriesArray.push('Rodzinna');

    // 👇 TWORZENIE FORM DATA (Zamiast obiektu JSON)
    const formData = new FormData();
    formData.append('name', this.trip.name);
    formData.append('startLocation', this.trip.startLocation);
    formData.append('destination', this.trip.destination);
    formData.append('startDate', this.trip.startDate);
    formData.append('endDate', this.trip.endDate);
    formData.append('price', String(this.trip.price));
    formData.append('type', this.trip.type);
    formData.append('spots', String(this.trip.spots));
    formData.append('description', this.trip.description || '');
    
    // Przesyłamy tablicę jako JSON string
    formData.append('categories', JSON.stringify(categoriesArray));

    // Dodaj plik, jeśli jest wybrany
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.http.post(`${this.apiUrl}/trips`, formData, this.getHeaders()).subscribe({
      next: () => {
        sessionStorage.setItem('adminSuccess', 'Pielgrzymka dodana (ze zdjęciem)!');
        this.navigateBack();
      },
      error: (err) => {
        console.error(err);
        alert('Błąd: ' + (err.error?.message || err.message));
      }
    });
  }

  cancel() { this.navigateBack(); }
  
  navigateBack() {
    this.router.navigate(['/admin'], { queryParams: { tab: 'trips' } }).then(() => window.scrollTo(0, 0));
  }
}