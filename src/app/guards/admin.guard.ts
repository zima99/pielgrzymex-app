import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  // 1. Sprawdź, czy użytkownik ma dane w localStorage
  const userString = localStorage.getItem('user');

  if (userString) {
    const user = JSON.parse(userString);

    // 2. Sprawdź, czy ma rolę ADMIN
    if (user.role === 'admin') {
      return true; // Puszczamy dalej
    }
  }

  // 3. Jeśli nie jest adminem lub nie jest zalogowany -> WYJAZD na stronę główną
  // Możesz tu też przekierować na /logowanie
  router.navigate(['/']); 
  return false;
};