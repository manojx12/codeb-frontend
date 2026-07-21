import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Brand } from '../../services/brand';

@Component({
  selector: 'app-brand-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './brand-list.html',
  styleUrl: './brand-list.css',
})
export class BrandList implements OnInit {

  brands: any[] = [];

  constructor(
    private brandService: Brand,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.brandService.getAllBrands().subscribe({
      next: (data) => {
        this.brands = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching brands:', err);
      }
    });
  }

  deleteBrand(id: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this brand?');
    if (confirmDelete) {
      this.brandService.deleteBrand(id).subscribe({
        next: () => {
          this.brands = this.brands.filter(b => b.id !== id);
          this.cdr.detectChanges();
        },
        error: (err) => {
          if (err.status === 200 || err.status === 204) {
            this.brands = this.brands.filter(b => b.id !== id);
            this.cdr.detectChanges();
          } else {
            console.error('Error deleting brand:', err);
          }
        }
      });
    }
  }
}
