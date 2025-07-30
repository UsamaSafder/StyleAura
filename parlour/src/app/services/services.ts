import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Footer } from '../footer/footer';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-services',
  imports: [RouterOutlet,Footer,NgFor,RouterLink],
  templateUrl: './services.html',
  styleUrl: './services.css'
})
export class Services {
   services = [
    { title: 'Party Makeup', image: 'party.jpg' },
    { title: 'Bridal Makeup', image: 'bridal.jpg' },
    { title: 'Manicure Pedicure', image: 'bridal.jpg' },
    { title: 'Hair Cut', image: 'hairstyle.jpg' },
    { title: 'Mehndi Art', image: 'mehndi.jpg' },
    { title: 'Hydra Facial', image: 'bridal.jpg' },
    { title: 'Hair Coloring', image: 'bridal.jpg' },
    { title: 'Threading', image: 'bridal.jpg' },
    { title: 'Waxing', image: 'bridal.jpg' },
    { title: 'Nail Art', image: 'nail.jpg' },
    { title: 'Hair Styling', image: 'hairstyle.jpg' },
    { title: 'Body Massage', image: 'mehndi.jpg' },
    { title: 'Skin Polish', image: 'bridal.jpg' },
    { title: 'Makeover', image: 'hairstyle.jpg' },
    { title: 'Face Bleach', image: 'bridal.jpg' },
  ];
}
