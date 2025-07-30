import { Component } from '@angular/core';
import { Footer } from '../footer/footer';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-about-us',
  imports: [Footer,CommonModule,RouterOutlet,RouterLink],
  templateUrl: './about-us.html',
  styleUrl: './about-us.css'
})
export class AboutUs {

}
