import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf, CommonModule,RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  mobileMenuOpen = false;

  constructor(private router: Router) {}

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  logout() {
    // Optional: Clear session/localStorage
    localStorage.clear();

    // Navigate to logout/login page
    this.router.navigate(['/login']);
  }
}
