import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Payroll } from '../../services/payroll';

@Component({
  selector: 'app-payroll-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './payroll-list.html',
  styleUrl: './payroll-list.css',
})
export class PayrollList implements OnInit {

  payrolls: any[] = [];

  constructor(
    private payrollService: Payroll,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.payrollService.getAllPayrolls().subscribe({
      next: (data) => {
        this.payrolls = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching payrolls:', err);
      }
    });
  }

  deletePayroll(id: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this payroll record?');
    if (confirmDelete) {
      this.payrollService.deletePayroll(id).subscribe({
        next: () => {
          this.payrolls = this.payrolls.filter(p => p.id !== id);
          this.cdr.detectChanges();
        },
        error: (err) => {
          if (err.status === 200 || err.status === 204) {
            this.payrolls = this.payrolls.filter(p => p.id !== id);
            this.cdr.detectChanges();
          } else {
            console.error('Error deleting payroll:', err);
          }
        }
      });
    }
  }
}
