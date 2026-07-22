import { Component, signal } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('mis-invoicing-frontend');
  showNavbar = signal(true);

  private hiddenNavbarRoutes = ['/login', '/register', '/forgot-password', '/reset-password'];

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const url: string = event.urlAfterRedirects;
      this.showNavbar.set(
        !this.hiddenNavbarRoutes.some(route => url.startsWith(route))
      );
    });
  }
}
