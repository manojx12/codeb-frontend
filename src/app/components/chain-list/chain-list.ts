import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Chain } from '../../services/chain';

@Component({
  selector: 'app-chain-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './chain-list.html',
  styleUrl: './chain-list.css',
})
export class ChainList implements OnInit {

  chains: any[] = [];

  constructor(
    private chainService: Chain,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.chainService.getAllChains().subscribe({
      next: (data) => {
        this.chains = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching chains:', err);
      }
    });
  }

  deleteChain(id: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this chain?');
    if (confirmDelete) {
      this.chainService.deleteChain(id).subscribe({
        next: () => {
          this.chains = this.chains.filter(c => c.id !== id);
          this.cdr.detectChanges();
        },
        error: (err) => {
          if (err.status === 200 || err.status === 204) {
            this.chains = this.chains.filter(c => c.id !== id);
            this.cdr.detectChanges();
          } else {
            console.error('Error deleting chain:', err);
          }
        }
      });
    }
  }
}
