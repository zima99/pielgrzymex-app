import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { MapComponent } from './components/map/map';
import { AdminPanelComponent } from './components/admin-panel/admin-panel';

export const routes: Routes = [
  // Strona główna
  { path: '', component: HomeComponent },
  
  // Autoryzacja
  { path: 'logowanie', component: LoginComponent },
  { path: 'rejestracja', component: RegisterComponent },
  
  // Mapa
  { path: 'mapa', component: MapComponent },

  // Panel Admina (Dostępny pod /admin)
  { path: 'admin', component: AdminPanelComponent },

  // Opcjonalnie: Przekierowanie nieznanych adresów na stronę główną
  { path: '**', redirectTo: '' }
];