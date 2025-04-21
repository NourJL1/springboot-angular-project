import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private router: Router) {}

  logout() {
    // Si tu stockes un token ou quelque chose dans le localStorage
    localStorage.clear(); // ou localStorage.removeItem('token');
    
    // Redirige vers la page de login
    this.router.navigate(['/login']);
  }
}
