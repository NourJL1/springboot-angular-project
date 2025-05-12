import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { UserService } from './user.service';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient, 
    private userService: UserService,
    private router: Router
  ) {}

  private apiUrl = `${environment.apiUrl}`;

  register(user: any, files: File[]): Observable<any> {
    const formData = new FormData();
    formData.append('user', JSON.stringify(user));
    
    if (files?.length) {
      files.forEach(file => formData.append('files', file, file.name));
    }

    return this.http.post(`${this.apiUrl}/users/register`, formData).pipe(
      tap((response) => console.log('Registration successful:', response)),
      catchError(this.handleError)
    );
  }

  login(username: string, password: string): Observable<any> {
    const loginPayload = { username, password };
    return this.http.post<any>(`${this.apiUrl}/users/login`, loginPayload).pipe(
      tap({
        next: (response) => {
          // Store all necessary user data
          localStorage.setItem('authToken', response.token); // Make sure your backend returns a token
          localStorage.setItem('roles', JSON.stringify(response.role));
          localStorage.setItem('username', response.username);
          localStorage.setItem('userId', response.userId);
          localStorage.setItem('fullname', response.fullname);
          
          this.userService.setLoggedInUserId(response.userId);
          
          // Navigate based on user role or status
          this.router.navigate(['/wallet']); // Or your default route
        },
        error: (err) => console.error('Login failed:', err)
      }),
      catchError(this.handleError)
    );
  }

  logout(): void {
    this.userService.clearLoggedInUserId();
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    // Check both token and userId for more robust authentication
    return !!localStorage.getItem('authToken') && !!localStorage.getItem('userId');
  }

  getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = error.error?.message || error.message || 'An unknown error occurred!';
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}