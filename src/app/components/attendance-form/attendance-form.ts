import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Attendance } from '../../services/attendance';
import { Employee } from '../../services/employee';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-attendance-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './attendance-form.html',
  styleUrl: './attendance-form.css',
})
export class AttendanceForm implements OnInit {

  attendance: any = {
    date: '',
    status: 'present',
    employee: null
  };

  employees: any[] = [];
  selectedEmployeeId: number | null = null;

  isEditMode = false;
  attendanceId: number | null = null;

  constructor(
    private attendanceService: Attendance,
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
      this.attendanceId = Number(idParam);
      this.attendanceService.getAttendanceById(this.attendanceId).subscribe({
        next: (data) => {
          this.attendance = data;
          this.selectedEmployeeId = data.employee ? data.employee.id : null;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error fetching attendance record:', err);
        }
      });
    }
  }

  onSubmit(): void {
    const selectedEmployee = this.employees.find(e => e.id === Number(this.selectedEmployeeId));
    this.attendance.employee = selectedEmployee;

    if (this.isEditMode && this.attendanceId !== null) {
      this.attendanceService.updateAttendance(this.attendanceId, this.attendance).subscribe({
        next: () => {
          this.router.navigate(['/attendance']);
        },
        error: (err) => {
          console.error('Error updating attendance:', err);
        }
      });
    } else {
      this.attendanceService.createAttendance(this.attendance).subscribe({
        next: () => {
          this.router.navigate(['/attendance']);
        },
        error: (err) => {
          console.error('Error creating attendance:', err);
        }
      });
    }
  }
}
