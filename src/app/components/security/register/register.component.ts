import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StepUsernameComponent } from './step-username/step-username.component';
import { StepPhoneComponent } from './step-phone/step-phone.component';
import { StepEmailComponent } from './step-email/step-email.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    StepUsernameComponent,
    StepPhoneComponent,
    StepEmailComponent,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  currentStep = 1;

  user = {
    username: '',
    password: '',
    fullname: '',
    phone_nbr: '',
    email: '',
    country: '',
    identificationType: '',
    walletType: ''
  };
  
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  goToNextStep() {
// Step 1: Choosing a wallet type
if (this.currentStep === 1) {
  if (!this.user.walletType.trim() || !this.user.walletType.trim()) {
    this.errorMessage = 'Please choose a wallet type.';
    return;
  }
}

    // Step 2: Validate Full Name and Username
    if (this.currentStep === 2) {
      if (!this.user.fullname.trim() || !this.user.username.trim()) {
        this.errorMessage = 'Please fill in both Full Name and Username.';
        return;
      }
    }
  
    // Step 3: Validate Phone Number
    if (this.currentStep === 3) {
      if (!this.user.phone_nbr.trim()) {
        this.errorMessage = 'Please enter your phone number.';
        return;
      }
    }
  
    // Step 4: Validate Email and Password
    if (this.currentStep === 4) {
      if (!this.user.email.trim() || !this.user.password.trim()) {
        this.errorMessage = 'Please enter your email and password.';
        return;
      }
    }
  
    // Clear any previous error and go to the next step
    this.errorMessage = '';
    this.currentStep++;
  }
  
  goToPreviousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  onSubmit(): void {
    this.userService.register(this.user).subscribe({
      next: () => {
        this.successMessage = 'Registration successful!';
        this.errorMessage = '';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (error) => {
        console.error('Registration error:', error);
        this.errorMessage = 'Registration failed. Please try again.';
        this.successMessage = '';
      },
    });
  }

  // Add the onFileSelected method here
  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement; // Cast the event target to HTMLInputElement
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0]; // Get the first selected file
      console.log(file); // You can handle the file here (e.g., upload it)
    }
  }
}