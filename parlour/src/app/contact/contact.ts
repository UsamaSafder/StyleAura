import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-contact',
  imports: [RouterOutlet,RouterLink,Footer],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {

}
