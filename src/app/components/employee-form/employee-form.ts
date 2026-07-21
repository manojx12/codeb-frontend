import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../services/employee';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css',
})
export class EmployeeForm implements OnInit {

  employee: any = {
    name: '',
    email: '',
    phoneNumber: '',
    designation: '',
    department: '',
    basicSalary: null
  };

  isEditMode = false;
  employeeId: number | null = null;

  constructor(
    private employeeService: Employee,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.employeeId = Number(idParam);
      this.employeeService.getEmployeeById(this.employeeId).subscribe({
        next: (data) => {
          this.employee = data;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error fetching employee:', err);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.isEditMode && this.employeeId !== null) {
      this.employeeService.updateEmployee(this.employeeId, this.employee).subscribe({
        next: () => {
          this.router.navigate(['/employees']);
        },
        error: (err) => {
          console.error('Error updating employee:', err);
        }
      });
    } else {
      this.employeeService.createEmployee(this.employee).subscribe({
        next: () => {
          this.router.navigate(['/employees']);
        },
        error: (err) => {
          console.error('Error creating employee:', err);
        }
      });
    }
  }
}
