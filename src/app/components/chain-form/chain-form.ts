import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Chain } from '../../services/chain';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chain-form',
  imports: [FormsModule],
  templateUrl: './chain-form.html',
  styleUrl: './chain-form.css',
})
export class ChainForm implements OnInit {

  chain = {
    name: ''
  };

  isEditMode = false;
  chainId: number | null = null;

  constructor(
    private chainService: Chain,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.chainId = Number(idParam);
      this.chainService.getChainById(this.chainId).subscribe({
        next: (data) => {
          this.chain = data;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error fetching chain:', err);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.isEditMode && this.chainId !== null) {
      this.chainService.updateChain(this.chainId, this.chain).subscribe({
        next: () => {
          this.router.navigate(['/chains']);
        },
        error: (err) => {
          console.error('Error updating chain:', err);
        }
      });
    } else {
      this.chainService.createChain(this.chain).subscribe({
        next: () => {
          this.router.navigate(['/chains']);
        },
        error: (err) => {
          console.error('Error creating chain:', err);
        }
      });
    }
  }
}
