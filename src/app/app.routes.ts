import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home'; // Tu pewnie masz stare nazwy, zostaw jak jest u Ciebie
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { MapComponent } from './components/map/map';
import { AdminPanelComponent } from './components/admin-panel/admin-panel'; // Tutaj sprawdź czy u Ciebie jest admin-panel.ts czy admin-panel.component.ts

// 👇 TUTAJ POPRAWKA IMPORTU
import { AdminUserEditComponent } from './components/admin-user-edit/admin-user-edit'; 

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'logowanie', component: LoginComponent },
  { path: 'rejestracja', component: RegisterComponent },
  { path: 'mapa', component: MapComponent },
  
  { path: 'admin', component: AdminPanelComponent },
  
  // Trasa edycji
  { path: 'admin/user/:id', component: AdminUserEditComponent },

  { path: '**', redirectTo: '' }
];