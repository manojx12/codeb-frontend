import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Group } from '../../services/group';

@Component({
  selector: 'app-group-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './group-list.html',
  styleUrl: './group-list.css',
})
export class GroupList implements OnInit {

  groups: any[] = [];

  constructor(
    private groupService: Group,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.groupService.getAllGroups().subscribe({
      next: (data) => {
        this.groups = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching groups:', err);
      }
    });
  }

  deleteGroup(id: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this group?');
    if (confirmDelete) {
      this.groupService.deleteGroup(id).subscribe({
        next: () => {
          this.groups = this.groups.filter(g => g.id !== id);
          this.cdr.detectChanges();
        },
        error: (err) => {
          if (err.status === 200 || err.status === 204) {
            this.groups = this.groups.filter(g => g.id !== id);
            this.cdr.detectChanges();
          } else {
            console.error('Error deleting group:', err);
          }
        }
      });
    }
  }
}
