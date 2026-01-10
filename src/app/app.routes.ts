import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { OfferComponent } from './components/offer/offer';
import { MapComponent } from './components/map/map';
import { DetailsComponent } from './components/details/details'; // <--- Import

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'oferta', component: OfferComponent },
  { path: 'mapa', component: MapComponent },
  { path: 'pielgrzymka/:id', component: DetailsComponent }, // <--- Nowa ścieżka dynamiczna
];