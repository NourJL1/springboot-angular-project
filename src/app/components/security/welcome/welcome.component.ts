import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletService } from '../../../services/wallet.service';
import { interval, takeUntil } from 'rxjs';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  private destroy$ = new Subject<void>();

  constructor(private walletService: WalletService) {
    // Check status every 30 seconds
    interval(30000).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.walletService.getWalletStatus().subscribe((status: string) => {
        if (status === 'APPROVED') {
          window.location.href = '/wallet';
        }
      });
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}