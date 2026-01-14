import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { MapComponent } from './components/map/map';
import { AdminPanelComponent } from './components/admin-panel/admin-panel';
import { AdminUserEditComponent } from './components/admin-user-edit/admin-user-edit';

// 👇 IMPORTUJEMY NOWY KOMPONENT (który zaraz stworzymy)
import { AdminUserAddComponent } from './components/admin-user-add/admin-user-add';
import { AdminTripAddComponent } from './components/admin-trip-add/admin-trip-add';
import { AdminTripEditComponent } from './components/admin-trip-edit/admin-trip-edit';
import { TripDetailsComponent } from './components/trip-details/trip-details';

import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'logowanie', component: LoginComponent },
  { path: 'rejestracja', component: RegisterComponent },
  { path: 'mapa', component: MapComponent },
  { path: 'trip/:id', component: TripDetailsComponent },
  { 
    path: 'admin', 
    component: AdminPanelComponent,
    canActivate: [adminGuard]
  },

  // ⚠️ TO MUSI BYĆ PIERWSZE (przed :id)
  { 
    path: 'admin/user/new', 
    component: AdminUserAddComponent,
    canActivate: [adminGuard]
  },

  // Dopiero potem to (bo :id łapie wszystko)
  { 
    path: 'admin/user/:id', 
    component: AdminUserEditComponent,
    canActivate: [adminGuard]
  },
  { 
    path: 'admin/trip/new', 
    component: AdminTripAddComponent,
    canActivate: [adminGuard]
  },
  { path: 'admin/trip/:id', component: AdminTripEditComponent, canActivate: [adminGuard] },

  { path: '**', redirectTo: '' }
];