import { Component, OnInit } from '@angular/core'; // Dodaj OnInit
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api'; // <--- Import Serwisu

// Interfejs (musi pasować do tego co wysyła backend)
interface PlaceCard {
  title: string;
  image: string;
  country: string;
  price?: number; // Opcjonalne, bo backend wysyła, a frontend na razie nie wyświetlał
}

@Component({
  selector: 'app-featured-lists',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './featured-lists.html',
  styleUrls: ['./featured-lists.css']
})
export class FeaturedListsComponent implements OnInit {
  
  // SEKCJA 1: Tutaj załadujemy dane z serwera!
  popularPlaces: PlaceCard[] = []; // Pusta tablica na start

  // Reszta danych na razie zostaje "na sztywno" (dla sekcji 2 i 3)
  abroadTrips: PlaceCard[] = [
    { title: 'Rzym / Watykan', country: 'Włochy', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=400&auto=format&fit=crop' },
    { title: 'Santiago de Compostela', country: 'Hiszpania', image: 'https://images.unsplash.com/photo-1562619425-c307bb83bc42?q=80&w=400&auto=format&fit=crop' },
    { title: 'Fatima', country: 'Portugalia', image: 'https://images.unsplash.com/photo-1581260844781-64d84b8d76b1?q=80&w=400&auto=format&fit=crop' },
  ];

  mostViewed: PlaceCard[] = [
    { title: 'Warszawska Piesza', country: 'Polska', image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=400&auto=format&fit=crop' },
    { title: 'Rowerowa na Hel', country: 'Polska', image: 'https://images.unsplash.com/photo-1485965120184-e224f7230c4f?q=80&w=400&auto=format&fit=crop' },
  ];

  // Wstrzykujemy ApiService
  constructor(private apiService: ApiService) {}

  // To uruchamia się automatycznie przy starcie komponentu
  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    // Wołamy backend
    this.apiService.getPilgrimages().subscribe({
      next: (data) => {
        console.log('Dane z backendu:', data); // Zobaczysz to w konsoli przeglądarki (F12)
        this.popularPlaces = data; // Nadpisujemy tablicę danymi z serwera!
      },
      error: (err) => {
        console.error('Błąd pobierania danych:', err);
      }
    });
  }

  // Funkcja scrollowania (bez zmian)
  scroll(container: HTMLElement, direction: 'left' | 'right') {
    const scrollAmount = 300;
    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }
}