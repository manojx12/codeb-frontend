import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Payment } from '../../services/payment';
import { Invoice } from '../../services/invoice';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './payment-form.html',
  styleUrl: './payment-form.css',
})
export class PaymentForm implements OnInit {

  payment: any = {
    amountPaid: null,
    paymentDate: '',
    paymentMethod: 'cash',
    invoice: null
  };

  invoices: any[] = [];
  selectedInvoiceId: number | null = null;

  isEditMode = false;
  paymentId: number | null = null;

  constructor(
    private paymentService: Payment,
    private invoiceService: Invoice,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.invoiceService.getAllInvoices().subscribe({
      next: (data) => {
        this.invoices = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching invoices:', err);
      }
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.paymentId = Number(idParam);
      this.paymentService.getPaymentById(this.paymentId).subscribe({
        next: (data) => {
          this.payment = data;
          this.selectedInvoiceId = data.invoice ? data.invoice.id : null;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error fetching payment:', err);
        }
      });
    }
  }

  onSubmit(): void {
    const selectedInvoice = this.invoices.find(i => i.id === Number(this.selectedInvoiceId));
    this.payment.invoice = selectedInvoice;

    if (this.isEditMode && this.paymentId !== null) {
      this.paymentService.updatePayment(this.paymentId, this.payment).subscribe({
        next: () => {
          this.router.navigate(['/payments']);
        },
        error: (err) => {
          console.error('Error updating payment:', err);
        }
      });
    } else {
      this.paymentService.createPayment(this.payment).subscribe({
        next: () => {
          this.router.navigate(['/payments']);
        },
        error: (err) => {
          console.error('Error creating payment:', err);
        }
      });
    }
  }
}
