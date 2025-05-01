import { Routes } from '@angular/router';
import {HomeComponent} from './components/security/home/home.component'
import { LoginComponent } from './components/security/login/login.component';
import { RegisterComponent } from './components/security/register/register.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { ForgotPasswordComponent } from './components/security/forgot-password/forgot-password.component';
import { WalletComponent } from './components/security/wallet/wallet.component';
import { NavbarComponent } from './components/security/navbar/navbar.component';
import { AdminDashboardComponent } from './components/security/admin-dashboard/admin-dashboard.component';
export const routes: Routes = [

  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: { role: 'ROLE_USER' },
  },

  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'wallet', component: WalletComponent },
  {path: 'navbar', component: NavbarComponent},
  {path: 'admin-dashboard', component: AdminDashboardComponent}

];
