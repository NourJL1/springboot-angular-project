import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { UserService } from './user.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private userService: UserService) {}

  private apiUrl = `${environment.apiUrl}`;

  register(user: any, files: File[]): Observable<any> {
    const formData = new FormData();
    
    // Append user data as JSON
    formData.append('user', JSON.stringify(user));
    
    // Append files if they exist
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i], files[i].name);
      }
    }

    return this.http.post(`${this.apiUrl}/users/register`, formData).pipe(
      tap((response) => {
        console.log('Registration successful:', response);
      }),
      catchError(this.handleError)
    );
  }

  login(username: string, password: string): Observable<any> {
    const loginPayload = { username, password };
    console.log('Login Payload:', loginPayload);
    return this.http.post<any>(`${this.apiUrl}/users/login`, loginPayload).pipe(
      tap({
        next: (response) => {
          console.log('Login response:', response);
          localStorage.setItem('roles', JSON.stringify(response.role));
          localStorage.setItem('username', response.username);
          localStorage.setItem('userId', response.userId);
          localStorage.setItem('fullname', response.fullname);
          this.userService.setLoggedInUserId(response.userId);
        },
        error: (err) => {
          console.error('Login request failed:', err);
        },
      })
    );
  }

  logout(): void {
    this.userService.clearLoggedInUserId();
    localStorage.clear();
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = error.error?.message || error.message;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}