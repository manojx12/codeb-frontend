import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css'
})
export class ForgotPassword {
  email = '';
  message = '';
  errorMessage = '';
  loading = false;

  constructor(private authService: Auth) {}

  onSubmit() {
    this.message = '';
    this.errorMessage = '';
    this.loading = true;

    this.authService.forgotPassword(this.email).subscribe({
      next: (response) => {
        this.loading = false;
        this.message = response || 'Password reset link sent to your email.';
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error || 'Something went wrong. Please try again.';
      }
    });
  }
}
