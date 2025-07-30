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
    { title: 'Manicure Pedicure', image: 'manicure.jpg' },
    { title: 'Hair Cut', image: 'cut.jpg' },
    { title: 'Mehndi Art', image: 'mehndi.jpg' },
    { title: 'Hydra Facial', image: 'hydra.jpg' },
    { title: 'Hair Coloring', image: 'coloring.jpg' },
    { title: 'Threading', image: 'threading.jpg' },
    { title: 'Waxing', image: 'waxing.jpg' },
    { title: 'Nail Art', image: 'nail.jpg' },
    { title: 'Hair Styling', image: 'hairstyle.jpg' },
    { title: 'Body Massage', image: 'message.jpg' },
    { title: 'Skin Polish', image: 'polish.jpg' },
    { title: 'Makeover', image: 'makeover.jpg' },
    { title: 'Face Bleach', image: 'bleach.jpg' },
  ];
}
