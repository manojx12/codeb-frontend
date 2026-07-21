import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Group } from '../../services/group';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-group-form',
  imports: [FormsModule],
  templateUrl: './group-form.html',
  styleUrl: './group-form.css',
})
export class GroupForm implements OnInit {

  group = {
    name: ''
  };

  isEditMode = false;
  groupId: number | null = null;

  constructor(
    private groupService: Group,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.groupId = Number(idParam);
      this.groupService.getGroupById(this.groupId).subscribe({
        next: (data) => {
          this.group = data;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error fetching group:', err);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.isEditMode && this.groupId !== null) {
      this.groupService.updateGroup(this.groupId, this.group).subscribe({
        next: () => {
          this.router.navigate(['/groups']);
        },
        error: (err) => {
          console.error('Error updating group:', err);
        }
      });
    } else {
      this.groupService.createGroup(this.group).subscribe({
        next: () => {
          this.router.navigate(['/groups']);
        },
        error: (err) => {
          console.error('Error creating group:', err);
        }
      });
    }
  }
}
