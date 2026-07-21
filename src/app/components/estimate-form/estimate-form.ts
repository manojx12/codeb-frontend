import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Estimate } from '../../services/estimate';
import { Client } from '../../services/client';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-estimate-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './estimate-form.html',
  styleUrl: './estimate-form.css',
})
export class EstimateForm implements OnInit {

  estimate: any = {
    estimateNumber: '',
    estimateDate: '',
    amount: null,
    status: 'draft',
    client: null
  };

  clients: any[] = [];
  selectedClientId: number | null = null;

  isEditMode = false;
  estimateId: number | null = null;

  constructor(
    private estimateService: Estimate,
    private clientService: Client,
    private router: Router,
    private route: ActivatedRoute,
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

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.estimateId = Number(idParam);
      this.estimateService.getEstimateById(this.estimateId).subscribe({
        next: (data) => {
          this.estimate = data;
          this.selectedClientId = data.client ? data.client.id : null;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error fetching estimate:', err);
        }
      });
    }
  }

  onSubmit(): void {
    const selectedClient = this.clients.find(c => c.id === Number(this.selectedClientId));
    this.estimate.client = selectedClient;

    if (this.isEditMode && this.estimateId !== null) {
      this.estimateService.updateEstimate(this.estimateId, this.estimate).subscribe({
        next: () => {
          this.router.navigate(['/estimates']);
        },
        error: (err) => {
          console.error('Error updating estimate:', err);
        }
      });
    } else {
      this.estimateService.createEstimate(this.estimate).subscribe({
        next: () => {
          this.router.navigate(['/estimates']);
        },
        error: (err) => {
          console.error('Error creating estimate:', err);
        }
      });
    }
  }
}
