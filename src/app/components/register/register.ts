import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  name = '';
  email = '';
  password = '';
  role = 'SALES';
  successMessage = '';
  errorMessage = '';

  constructor(
    private authService: Auth,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.register({
      fullName: this.name,
      email: this.email,
      passwordHash: this.password,
      role: this.role
    }).subscribe({
      next: (response) => {
        this.successMessage = 'Registration successful! A verification link has been sent to your email. Please verify your email before logging in.';
        this.cdr.detectChanges();

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 4000);
      },
      error: (err) => {
        this.errorMessage = typeof err.error === 'string' ? err.error : (err.error?.message || err.error?.error || 'Registration failed. Please try again.');
        this.cdr.detectChanges();
      }
    });
  }
}
