import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { OfferComponent } from './components/offer/offer';
import { MapComponent } from './components/map/map';
import { DetailsComponent } from './components/details/details'; // <--- Import
import { RegisterComponent } from './components/register/register';
import { LoginComponent } from './components/login/login';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'oferta', component: OfferComponent },
  { path: 'mapa', component: MapComponent },
  { path: 'pielgrzymka/:id', component: DetailsComponent }, // <--- Nowa ścieżka dynamiczna
  { path: 'rejestracja', component: RegisterComponent },
  { path: 'logowanie', component: LoginComponent },
];