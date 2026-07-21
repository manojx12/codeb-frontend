import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Invoice } from '../../services/invoice';

@Component({
  selector: 'app-invoice-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './invoice-list.html',
  styleUrl: './invoice-list.css',
})
export class InvoiceList implements OnInit {

  invoices: any[] = [];

  constructor(
    private invoiceService: Invoice,
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
  }

  deleteInvoice(id: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this invoice?');
    if (confirmDelete) {
      this.invoiceService.deleteInvoice(id).subscribe({
        next: () => {
          this.invoices = this.invoices.filter(i => i.id !== id);
          this.cdr.detectChanges();
        },
        error: (err) => {
          if (err.status === 200 || err.status === 204) {
            this.invoices = this.invoices.filter(i => i.id !== id);
            this.cdr.detectChanges();
          } else {
            console.error('Error deleting invoice:', err);
          }
        }
      });
    }
  }
}
