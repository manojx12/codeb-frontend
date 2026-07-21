import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Leave } from '../../services/leave';
import { Employee } from '../../services/employee';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-leave-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './leave-form.html',
  styleUrl: './leave-form.css',
})
export class LeaveForm implements OnInit {

  leave: any = {
    fromDate: '',
    toDate: '',
    reason: '',
    status: 'pending',
    employee: null
  };

  employees: any[] = [];
  selectedEmployeeId: number | null = null;

  isEditMode = false;
  leaveId: number | null = null;

  constructor(
    private leaveService: Leave,
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
      this.leaveId = Number(idParam);
      this.leaveService.getLeaveById(this.leaveId).subscribe({
        next: (data) => {
          this.leave = data;
          this.selectedEmployeeId = data.employee ? data.employee.id : null;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error fetching leave record:', err);
        }
      });
    }
  }

  onSubmit(): void {
    const selectedEmployee = this.employees.find(e => e.id === Number(this.selectedEmployeeId));
    this.leave.employee = selectedEmployee;

    if (this.isEditMode && this.leaveId !== null) {
      this.leaveService.updateLeave(this.leaveId, this.leave).subscribe({
        next: () => {
          this.router.navigate(['/leaves']);
        },
        error: (err) => {
          console.error('Error updating leave:', err);
        }
      });
    } else {
      this.leaveService.createLeave(this.leave).subscribe({
        next: () => {
          this.router.navigate(['/leaves']);
        },
        error: (err) => {
          console.error('Error creating leave:', err);
        }
      });
    }
  }
}
