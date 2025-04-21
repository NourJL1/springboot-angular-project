import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-wallet',
  standalone: true,
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css'],
  imports: [CommonModule] 
})
export class WalletComponent implements OnInit {
  wallet: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    this.http.get(`http://localhost:8080/api/wallet/user/${userId}`).subscribe({
      next: data => this.wallet = data,
      error: err => console.error('Failed to load wallet', err)
    });
  }
}
