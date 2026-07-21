import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Invoice } from '../../services/invoice';
import { Client } from '../../services/client';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invoice-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './invoice-form.html',
  styleUrl: './invoice-form.css',
})
export class InvoiceForm implements OnInit {

  invoice: any = {
    invoiceNumber: '',
    invoiceDate: '',
    dueDate: '',
    subTotal: null,
    gstPercentage: null,
    gstAmount: 0,
    totalAmount: 0,
    status: 'draft',
    client: null
  };

  clients: any[] = [];
  selectedClientId: number | null = null;

  isEditMode = false;
  invoiceId: number | null = null;

  constructor(
    private invoiceService: Invoice,
    private clientService: Client,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    // Sab clients fetch karo dropdown ke liye
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
      this.invoiceId = Number(idParam);
      this.invoiceService.getInvoiceById(this.invoiceId).subscribe({
        next: (data) => {
          this.invoice = data;
          this.selectedClientId = data.client ? data.client.id : null;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error fetching invoice:', err);
        }
      });
    }
  }

  calculateGst(): void {
    const subTotal = Number(this.invoice.subTotal) || 0;
    const gstPercentage = Number(this.invoice.gstPercentage) || 0;

    const gstAmount = (subTotal * gstPercentage) / 100;
    this.invoice.gstAmount = Math.round(gstAmount * 100) / 100;
    this.invoice.totalAmount = Math.round((subTotal + gstAmount) * 100) / 100;
  }

  onSubmit(): void {
    // Selected client id se poora client object jodo (backend ko chahiye)
    const selectedClient = this.clients.find(c => c.id === Number(this.selectedClientId));
    this.invoice.client = selectedClient;

    if (this.isEditMode && this.invoiceId !== null) {
      this.invoiceService.updateInvoice(this.invoiceId, this.invoice).subscribe({
        next: () => {
          this.router.navigate(['/invoices']);
        },
        error: (err) => {
          console.error('Error updating invoice:', err);
        }
      });
    } else {
      this.invoiceService.createInvoice(this.invoice).subscribe({
        next: () => {
          this.router.navigate(['/invoices']);
        },
        error: (err) => {
          console.error('Error creating invoice:', err);
        }
      });
    }
  }
}
