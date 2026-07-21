import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Payment } from '../../services/payment';

@Component({
  selector: 'app-payment-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './payment-list.html',
  styleUrl: './payment-list.css',
})
export class PaymentList implements OnInit {

  payments: any[] = [];

  constructor(
    private paymentService: Payment,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.paymentService.getAllPayments().subscribe({
      next: (data) => {
        this.payments = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching payments:', err);
      }
    });
  }

  deletePayment(id: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this payment?');
    if (confirmDelete) {
      this.paymentService.deletePayment(id).subscribe({
        next: () => {
          this.payments = this.payments.filter(p => p.id !== id);
          this.cdr.detectChanges();
        },
        error: (err) => {
          if (err.status === 200 || err.status === 204) {
            this.payments = this.payments.filter(p => p.id !== id);
            this.cdr.detectChanges();
          } else {
            console.error('Error deleting payment:', err);
          }
        }
      });
    }
  }
}
