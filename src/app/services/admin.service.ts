import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../entities/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:8080/api'; // Your existing API base URL

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users/admin/all`);
  }

  updateWalletStatus(userId: number, status: string): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/users/${userId}/wallet-status`, { status });
  }
}