import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    
    const credentials = {
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      password: (form.elements.namedItem('password') as HTMLInputElement).value
    };

    this.authService.login(credentials).subscribe({
      next: () => {
        // Sukces! Przekieruj na mapę
        this.router.navigate(['/mapa']);
      },
      error: (err) => {
        console.error(err);
        alert('Błąd logowania: Błędny email lub hasło.');
      }
    });
  }
}