import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Attendance } from '../../services/attendance';

@Component({
  selector: 'app-attendance-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './attendance-list.html',
  styleUrl: './attendance-list.css',
})
export class AttendanceList implements OnInit {

  attendanceRecords: any[] = [];

  constructor(
    private attendanceService: Attendance,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.attendanceService.getAllAttendance().subscribe({
      next: (data) => {
        this.attendanceRecords = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching attendance:', err);
      }
    });
  }

  deleteAttendance(id: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this attendance record?');
    if (confirmDelete) {
      this.attendanceService.deleteAttendance(id).subscribe({
        next: () => {
          this.attendanceRecords = this.attendanceRecords.filter(a => a.id !== id);
          this.cdr.detectChanges();
        },
        error: (err) => {
          if (err.status === 200 || err.status === 204) {
            this.attendanceRecords = this.attendanceRecords.filter(a => a.id !== id);
            this.cdr.detectChanges();
          } else {
            console.error('Error deleting attendance:', err);
          }
        }
      });
    }
  }
}
