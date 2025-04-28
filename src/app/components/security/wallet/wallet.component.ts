import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
  selector: 'app-wallet',
  standalone: true,
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css'],
  imports: [CommonModule, NavbarComponent] 
})
export class WalletComponent implements OnInit {
  wallet: any = null;

  constructor(private http: HttpClient ,private router: Router) {}


  ngOnInit() {
    const userId = localStorage.getItem('userId');
    this.http.get(`http://localhost:8080/api/wallet/user/${userId}`).subscribe({
      next: data => this.wallet = data,
      error: err => console.error('Failed to load wallet', err)
    });
  }
  logout() {
    // Here you might also want to clear any user session/tokens
    // For example:
    // localStorage.removeItem('authToken');
    
    // Redirect to login page
    this.router.navigate(['/login']);
  }
}
