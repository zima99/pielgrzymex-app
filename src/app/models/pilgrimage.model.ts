export interface Pilgrimage {
  id: string;              // Unikalne ID (w Mongo będzie to _id)
  title: string;           // Tytuł np. "Rowerowa na Jasną Górę"
  description: string;     // Krótki opis
  imageUrl: string;        // Zdjęcie główne
  price: number;           // Cena
  startDate: Date;         // Data startu
  endDate: Date;           // Data końca
  difficulty: 'Łatwa' | 'Średnia' | 'Trudna'; // Poziom trudności
  type: 'Piesza' | 'Rowerowa' | 'Autokar' | 'Samolot';
  organizer: string;       // Nazwa organizatora (potem zmienimy na ID usera)
  spotsAvailable: number;  // Wolne miejsca
}