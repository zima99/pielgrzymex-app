import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  passwordError: string = '';
  confirmPasswordError: string = '';
  generalError: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(event: Event) {
    event.preventDefault();
    
    // Reset błędów
    this.passwordError = '';
    this.confirmPasswordError = '';
    this.generalError = '';

    const form = event.target as HTMLFormElement;
    
    const firstName = (form.elements.namedItem('firstName') as HTMLInputElement).value;
    const lastName = (form.elements.namedItem('lastName') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;
    const confirmPassword = (form.elements.namedItem('confirmPassword') as HTMLInputElement).value;

    let isValid = true;

    // 1. Sprawdzamy czy hasła są identyczne
    if (password !== confirmPassword) {
      this.confirmPasswordError = 'Hasła muszą być identyczne!';
      isValid = false;
    }

    // 2. Sprawdzamy siłę hasła
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    if (!passwordRegex.test(password)) {
      this.passwordError = 'Hasło musi mieć dużą literę, cyfrę i znak spec.';
      isValid = false;
    }

    if (!isValid) return; // Jeśli błędy, stop.

    // Wysyłamy do serwera
    const formData = { firstName, lastName, email, password };

    this.authService.register(formData).subscribe({
      next: () => {
        alert('Sukces! Zarejestrowano.');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
        this.generalError = err.error.message || 'Błąd serwera.';
      }
    });
  }
}