import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule], // Dodaj RouterModule żeby działał link do logowania
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    
    const formData = {
      firstName: (form.elements.namedItem('firstName') as HTMLInputElement).value,
      lastName: (form.elements.namedItem('lastName') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      password: (form.elements.namedItem('password') as HTMLInputElement).value
    };

    this.authService.register(formData).subscribe({
      next: () => {
        alert('Konto założone! Witaj!');
        this.router.navigate(['/']); // Przekieruj na stronę główną
      },
      error: (err) => {
        console.error(err);
        alert('Błąd rejestracji: ' + (err.error.message || 'Spróbuj ponownie'));
      }
    });
  }
}