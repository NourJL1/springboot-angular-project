import { Routes } from '@angular/router';
import { HomeComponent } from './components/security/home/home.component';
import { LoginComponent } from './components/security/login/login.component';
import { RegisterComponent } from './components/security/register/register.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { ForgotPasswordComponent } from './components/security/forgot-password/forgot-password.component';
import { WalletComponent } from './components/security/wallet/wallet.component';
import { NavbarComponent } from './components/security/navbar/navbar.component';
import { AdminDashboardComponent } from './components/security/admin-dashboard/admin-dashboard.component';
import { WelcomeComponent } from './components/security/welcome/welcome.component';
import { walletStatusGuard } from './guards/wallet-status.guard';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },

  // Protected routes
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: { role: 'ROLE_USER' }
  },
  {
    path: 'wallet',
    component: WalletComponent,
    canActivate: [AuthGuard, walletStatusGuard],
    data: { requiredStatus: 'APPROVED' }
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
    canActivate: [AuthGuard],
    data: { requiredStatus: 'PENDING' }
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    data: { role: 'ROLE_ADMIN' }
  },

  // Navbar route (if still needed)
  { path: 'navbar', component: NavbarComponent },

  // Redirects
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];