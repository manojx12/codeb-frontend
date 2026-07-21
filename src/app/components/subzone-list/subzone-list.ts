import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subzone } from '../../services/subzone';

@Component({
  selector: 'app-subzone-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './subzone-list.html',
  styleUrl: './subzone-list.css',
})
export class SubzoneList implements OnInit {

  subzones: any[] = [];

  constructor(
    private subzoneService: Subzone,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.subzoneService.getAllSubzones().subscribe({
      next: (data) => {
        this.subzones = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching subzones:', err);
      }
    });
  }

  deleteSubzone(id: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this subzone?');
    if (confirmDelete) {
      this.subzoneService.deleteSubzone(id).subscribe({
        next: () => {
          this.subzones = this.subzones.filter(s => s.id !== id);
          this.cdr.detectChanges();
        },
        error: (err) => {
          if (err.status === 200 || err.status === 204) {
            this.subzones = this.subzones.filter(s => s.id !== id);
            this.cdr.detectChanges();
          } else {
            console.error('Error deleting subzone:', err);
          }
        }
      });
    }
  }
}
