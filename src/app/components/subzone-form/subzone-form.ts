import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subzone } from '../../services/subzone';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subzone-form',
  imports: [FormsModule],
  templateUrl: './subzone-form.html',
  styleUrl: './subzone-form.css',
})
export class SubzoneForm implements OnInit {

  subzone = {
    name: ''
  };

  isEditMode = false;
  subzoneId: number | null = null;

  constructor(
    private subzoneService: Subzone,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.subzoneId = Number(idParam);
      this.subzoneService.getSubzoneById(this.subzoneId).subscribe({
        next: (data) => {
          this.subzone = data;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error fetching subzone:', err);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.isEditMode && this.subzoneId !== null) {
      this.subzoneService.updateSubzone(this.subzoneId, this.subzone).subscribe({
        next: () => {
          this.router.navigate(['/subzones']);
        },
        error: (err) => {
          console.error('Error updating subzone:', err);
        }
      });
    } else {
      this.subzoneService.createSubzone(this.subzone).subscribe({
        next: () => {
          this.router.navigate(['/subzones']);
        },
        error: (err) => {
          console.error('Error creating subzone:', err);
        }
      });
    }
  }
}
