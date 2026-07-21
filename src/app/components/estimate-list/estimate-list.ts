import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Estimate } from '../../services/estimate';

@Component({
  selector: 'app-estimate-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './estimate-list.html',
  styleUrl: './estimate-list.css',
})
export class EstimateList implements OnInit {

  estimates: any[] = [];

  constructor(
    private estimateService: Estimate,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.estimateService.getAllEstimates().subscribe({
      next: (data) => {
        this.estimates = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching estimates:', err);
      }
    });
  }

  deleteEstimate(id: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this estimate?');
    if (confirmDelete) {
      this.estimateService.deleteEstimate(id).subscribe({
        next: () => {
          this.estimates = this.estimates.filter(e => e.id !== id);
          this.cdr.detectChanges();
        },
        error: (err) => {
          if (err.status === 200 || err.status === 204) {
            this.estimates = this.estimates.filter(e => e.id !== id);
            this.cdr.detectChanges();
          } else {
            console.error('Error deleting estimate:', err);
          }
        }
      });
    }
  }
}
