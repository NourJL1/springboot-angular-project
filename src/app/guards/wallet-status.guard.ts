import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, catchError, of } from 'rxjs';
import { WalletService } from '../services/wallet.service';
import { AuthService } from '../services/auth.service';

export const walletStatusGuard: CanActivateFn = (route) => {
  const walletService = inject(WalletService);
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    return router.createUrlTree(['/login']);
  }

  const requiredStatus = route.data?.['requiredStatus'] || 'ACTIVE';
  
  return walletService.getWalletStatus().pipe(
    map(status => {
      if (status === requiredStatus) {
        return true;
      }
      return router.createUrlTree(
        requiredStatus === 'ACTIVE' ? ['/welcome'] : ['/wallet']
      );
    }),
    catchError(() => of(router.createUrlTree(['/welcome'])))
  );
};