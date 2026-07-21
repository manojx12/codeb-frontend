import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Employee } from '../../services/employee';

@Component({
  selector: 'app-employee-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList implements OnInit {

  employees: any[] = [];

  constructor(
    private employeeService: Employee,
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
  }

  deleteEmployee(id: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this employee?');
    if (confirmDelete) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          this.employees = this.employees.filter(e => e.id !== id);
          this.cdr.detectChanges();
        },
        error: (err) => {
          if (err.status === 200 || err.status === 204) {
            this.employees = this.employees.filter(e => e.id !== id);
            this.cdr.detectChanges();
          } else {
            console.error('Error deleting employee:', err);
          }
        }
      });
    }
  }
}
