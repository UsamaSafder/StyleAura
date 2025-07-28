import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  mobileMenuOpen = false;

toggleMobileMenu() {
  console.log('Toggled');  // Debug
  this.mobileMenuOpen = !this.mobileMenuOpen;
}
}
