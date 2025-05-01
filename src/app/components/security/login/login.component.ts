import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [FormsModule, CommonModule],
  styleUrls: ['./login.component.css'],
})


export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: async (response) => {
        console.log('Full login response:', response);
        console.log('Role array:', response.role);
        console.log('First role:', response.role?.[0]);
  
        // ✅ FIX: access role name properly from the object inside the array
        const role = response.role?.[0]?.name?.toLowerCase();
  
        if (!role) {
          this.errorMessage = 'No role found in response.';
          return;
        }
  
        localStorage.setItem('userId', response.userId);
        localStorage.setItem('role', role);
  
        // ✅ redirect based on role
        if (role === 'admin') {
          await this.router.navigate(['/admin-dashboard']);
        } else {
          await this.router.navigate(['/wallet']);
        }
      },
      error: (error) => {
        console.error('Login error:', error);
        this.errorMessage = 'Login failed. Please check your credentials.';
      },
    });
  }
}
