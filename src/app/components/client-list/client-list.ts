import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Client } from '../../services/client';

@Component({
  selector: 'app-client-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './client-list.html',
  styleUrl: './client-list.css',
})
export class ClientList implements OnInit {

  clients: any[] = [];

  constructor(
    private clientService: Client,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.clientService.getAllClients().subscribe({
      next: (data) => {
        this.clients = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching clients:', err);
      }
    });
  }

  deleteClient(id: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this client?');
    if (confirmDelete) {
      this.clientService.deleteClient(id).subscribe({
        next: () => {
          this.clients = this.clients.filter(c => c.id !== id);
          this.cdr.detectChanges();
        },
        error: (err) => {
          // Agar status 200 ya 204 hai, toh yeh asal mein success hai — bas response parsing fail hui
          if (err.status === 200 || err.status === 204) {
            this.clients = this.clients.filter(c => c.id !== id);
            this.cdr.detectChanges();
          } else {
            console.error('Error deleting client:', err);
          }
        }
      });
    }
  }
}
