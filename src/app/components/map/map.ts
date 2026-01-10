import { Component, OnInit, AfterViewInit, NgZone, ChangeDetectorRef } from '@angular/core'; // <--- ZMIANA: Dodano ChangeDetectorRef
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api';
import { RouterModule } from '@angular/router';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './map.html',
  styleUrls: ['./map.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  priceValue: number = 5000;
  private map: any;
  selectedPin: any = null;
  
  // Wstrzykujemy ChangeDetectorRef (cdr)
  constructor(
    private apiService: ApiService, 
    private zone: NgZone,
    private cdr: ChangeDetectorRef // <--- ZMIANA
  ) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    // Ikonki
    const DefaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });
    L.Marker.prototype.options.icon = DefaultIcon;

    // Mapa
    this.map = L.map('map').setView([52.069, 19.480], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap'
    }).addTo(this.map);

    this.loadPins();
  }

  private loadPins(): void {
    this.apiService.getPilgrimages().subscribe({
      next: (data) => {
        data.forEach((trip: any) => {
          if (trip.lat && trip.lng) {
            
            const marker = L.marker([trip.lat, trip.lng]).addTo(this.map);

            // OBSŁUGA KLIKNIĘCIA
            marker.on('click', () => {
              console.log('Kliknięto w pinezkę:', trip.title); // <--- ZOBACZ CZY TO SIĘ POJAWIA W KONSOLI (F12)
              
              this.zone.run(() => {
                this.selectedPin = trip;
                this.cdr.detectChanges(); // <--- SIŁOWE ODŚWIEŻENIE WIDOKU
              });
            });

          }
        });
      },
      error: (err) => console.error(err)
    });
  }

  closeCard() {
    this.selectedPin = null;
    this.cdr.detectChanges(); // Tu też odświeżamy
  }
}