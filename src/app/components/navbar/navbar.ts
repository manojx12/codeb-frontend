import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  constructor(private authService: Auth) {}

  isAdmin(): boolean {
    return this.authService.getRole() === 'ADMIN';
  }

  logout() {
    this.authService.logout();
    window.location.href = '/login';
  }
}
