import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Header,Footer,NgIf],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  showHeader = true;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Only hide header on these routes
        const routesWithoutHeader = ['/login', '/signup'];
        
        // Trim any query parameters or fragments
        const currentPath = event.urlAfterRedirects.split('?')[0].split('#')[0];

        this.showHeader = !routesWithoutHeader.includes(currentPath);
      }
    });
  }
}
