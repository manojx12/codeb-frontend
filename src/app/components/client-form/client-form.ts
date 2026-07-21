import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Client } from '../../services/client';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client-form',
  imports: [FormsModule],
  templateUrl: './client-form.html',
  styleUrl: './client-form.css',
})
export class ClientForm implements OnInit {

  client = {
    name: '',
    email: '',
    phoneNumber: '',
    address: ''
  };

  isEditMode = false;
  clientId: number | null = null;

  constructor(
    private clientService: Client,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.clientId = Number(idParam);
      this.clientService.getClientById(this.clientId).subscribe({
        next: (data) => {
          this.client = data;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error fetching client:', err);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.isEditMode && this.clientId !== null) {
      this.clientService.updateClient(this.clientId, this.client).subscribe({
        next: () => {
          this.router.navigate(['/clients']);
        },
        error: (err) => {
          console.error('Error updating client:', err);
        }
      });
    } else {
      this.clientService.createClient(this.client).subscribe({
        next: () => {
          this.router.navigate(['/clients']);
        },
        error: (err) => {
          console.error('Error creating client:', err);
        }
      });
    }
  }
}
