import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Payroll } from '../../services/payroll';
import { Employee } from '../../services/employee';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payroll-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './payroll-form.html',
  styleUrl: './payroll-form.css',
})
export class PayrollForm implements OnInit {

  payroll: any = {
    month: '',
    basicSalary: 0,
    deductions: 0,
    netPay: 0,
    employee: null
  };

  employees: any[] = [];
  selectedEmployeeId: number | null = null;

  isEditMode = false;
  payrollId: number | null = null;

  constructor(
    private payrollService: Payroll,
    private employeeService: Employee,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (data) => {
        this.employees = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching employees:', err);
      }
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.payrollId = Number(idParam);
      this.payrollService.getPayrollById(this.payrollId).subscribe({
        next: (data) => {
          this.payroll = data;
          this.selectedEmployeeId = data.employee ? data.employee.id : null;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error fetching payroll record:', err);
        }
      });
    }
  }

  calculateNetPay(): void {
    const basic = Number(this.payroll.basicSalary) || 0;
    const deductions = Number(this.payroll.deductions) || 0;
    this.payroll.netPay = basic - deductions;
  }

  onSubmit(): void {
    const selectedEmployee = this.employees.find(e => e.id === Number(this.selectedEmployeeId));
    this.payroll.employee = selectedEmployee;

    if (this.isEditMode && this.payrollId !== null) {
      this.payrollService.updatePayroll(this.payrollId, this.payroll).subscribe({
        next: () => {
          this.router.navigate(['/payrolls']);
        },
        error: (err) => {
          console.error('Error updating payroll:', err);
        }
      });
    } else {
      this.payrollService.createPayroll(this.payroll).subscribe({
        next: () => {
          this.router.navigate(['/payrolls']);
        },
        error: (err) => {
          console.error('Error creating payroll:', err);
        }
      });
    }
  }
}
