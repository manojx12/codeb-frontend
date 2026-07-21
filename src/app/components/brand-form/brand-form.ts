import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Brand } from '../../services/brand';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-brand-form',
  imports: [FormsModule],
  templateUrl: './brand-form.html',
  styleUrl: './brand-form.css',
})
export class BrandForm implements OnInit {

  brand = {
    name: ''
  };

  isEditMode = false;
  brandId: number | null = null;

  constructor(
    private brandService: Brand,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.brandId = Number(idParam);
      this.brandService.getBrandById(this.brandId).subscribe({
        next: (data) => {
          this.brand = data;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error fetching brand:', err);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.isEditMode && this.brandId !== null) {
      this.brandService.updateBrand(this.brandId, this.brand).subscribe({
        next: () => {
          this.router.navigate(['/brands']);
        },
        error: (err) => {
          console.error('Error updating brand:', err);
        }
      });
    } else {
      this.brandService.createBrand(this.brand).subscribe({
        next: () => {
          this.router.navigate(['/brands']);
        },
        error: (err) => {
          console.error('Error creating brand:', err);
        }
      });
    }
  }
}
