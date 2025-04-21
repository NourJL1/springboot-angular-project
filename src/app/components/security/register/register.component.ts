import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators, AbstractControl,  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StepUsernameComponent } from './step-username/step-username.component';
import { StepPhoneComponent } from './step-phone/step-phone.component';
import { StepEmailComponent } from './step-email/step-email.component';
import { NgxIntlTelInputModule, CountryISO, SearchCountryField } from 'ngx-intl-tel-input';
import { HttpClient } from '@angular/common/http';

interface City {
  name: string;
}

interface PhoneNumber {
  internationalNumber: string;
  nationalNumber: string;
  e164Number: string;
  countryCode: string;
  dialCode: string;
  number: string;
  isNumberValid?: boolean;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    StepUsernameComponent,
    StepPhoneComponent,
    StepEmailComponent,
    NgxIntlTelInputModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  currentStep = 1;

  countries: any[] = [];
  cities: string[] = [];

  phoneForm = new FormGroup({
    phone: new FormControl<PhoneNumber | null>(null, [
      Validators.required,
      this.validatePhoneNumber
    ])
  });
  
  CountryISO = CountryISO;
  SearchCountryField = SearchCountryField;
  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates, 
    CountryISO.UnitedKingdom,
    CountryISO.Tunisia // Added Tunisia since you're using +216
  ];
  
  separateDialCode = true;
  searchCountryField = [
    SearchCountryField.Iso2,
    SearchCountryField.Name
  ];

  user = {
    username: '',
    password: '',
    fullname: '',
    phone_nbr: '',
    email: '',
    identificationType: '',
    walletType: '',
    country: '',
    city: ''
  };
  
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private userService: UserService, private router: Router, private http: HttpClient) {}

  // Custom phone number validator
  private validatePhoneNumber(control: AbstractControl) {
    const phoneValue = control.value as PhoneNumber | null;
    if (!phoneValue) {
      return { required: true };
    }
    if (!phoneValue.e164Number) {
      return { invalidFormat: true };
    }
    if (phoneValue.isNumberValid === false) {
      return { invalidNumber: true };
    }
    return null;
  }

  goToNextStep() {
    // Debugging
    console.log('Current Step:', this.currentStep);
    console.log('Phone Form Value:', this.phoneForm.value);
    console.log('Phone Form Valid:', this.phoneForm.valid);
    console.log('Phone Control Errors:', this.phoneForm.get('phone')?.errors);

    // Step 1: Choosing a wallet type
    if (this.currentStep === 1) {
      if (!this.user.walletType) {
        this.errorMessage = 'Please choose a wallet type.';
        return;
      }
    }

    // Step 2: Validate Full Name and Username
    if (this.currentStep === 2) {
      if (!this.user.fullname?.trim() || !this.user.username?.trim()) {
        this.errorMessage = 'Please fill in both Full Name and Username.';
        return;
      }
    }
  
    // In the goToNextStep method, update the phone validation part:
if (this.currentStep === 4) {
  const phoneControl = this.phoneForm.get('phone');
  
  if (!phoneControl?.value) {
    this.errorMessage = 'Please enter a phone number.';
    return;
  }

  // Check if the control is invalid
  if (phoneControl.invalid) {
    this.errorMessage = 'Please enter a valid phone number.';
    return;
  }

  const phoneValue = phoneControl.value as PhoneNumber;
  this.user.phone_nbr = phoneValue.e164Number;
}
  
    // Step 5: Validate Email and Password
    if (this.currentStep === 5) {
      if (!this.user.email?.trim() || !this.user.password?.trim()) {
        this.errorMessage = 'Please enter your email and password.';
        return;
      }
    }
  
    // Clear any previous error and go to the next step
    this.errorMessage = '';
    this.currentStep++;
  }

  ngOnInit(): void {
    this.getCountries();
  }

  getCountries(): void {
    this.http.get<any>('https://countriesnow.space/api/v0.1/countries')
      .subscribe((response) => {
        this.countries = response.data.map((item: any) => item.country).sort();
      });
  }
  
  onCountryChange(): void {
    const countryName = this.user.country;
    if (countryName) {
      this.getCities(countryName);
    }
  }
  
  getCities(countryName: string): void {
    this.http.post<any>('https://countriesnow.space/api/v0.1/countries/cities', {
      country: countryName
    }).subscribe(
      (res) => {
        this.cities = res.data || [];
      },
      (error) => {
        console.error("Error fetching cities", error);
      }
    );
  }
  
  goToPreviousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  onSubmit(): void {
    // First validate the current step (step 6)
    if (this.currentStep === 6) {
      if (!this.user.identificationType) {
        this.errorMessage = 'Please select an identification type.';
        return;
      }
    }
  
    // Then handle phone number validation if we're coming from step 4
    if (this.phoneForm.invalid) {
      this.errorMessage = 'Please enter a valid phone number.';
      return;
    }
  
    const phoneValue = this.phoneForm.get('phone')?.value as PhoneNumber;
    this.user.phone_nbr = phoneValue.e164Number;
    
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

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      console.log(file);
    }
  }
}