import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Leave } from '../../services/leave';

@Component({
  selector: 'app-leave-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './leave-list.html',
  styleUrl: './leave-list.css',
})
export class LeaveList implements OnInit {

  leaves: any[] = [];

  constructor(
    private leaveService: Leave,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.leaveService.getAllLeaves().subscribe({
      next: (data) => {
        this.leaves = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching leaves:', err);
      }
    });
  }

  deleteLeave(id: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this leave record?');
    if (confirmDelete) {
      this.leaveService.deleteLeave(id).subscribe({
        next: () => {
          this.leaves = this.leaves.filter(l => l.id !== id);
          this.cdr.detectChanges();
        },
        error: (err) => {
          if (err.status === 200 || err.status === 204) {
            this.leaves = this.leaves.filter(l => l.id !== id);
            this.cdr.detectChanges();
          } else {
            console.error('Error deleting leave:', err);
          }
        }
      });
    }
  }
}
