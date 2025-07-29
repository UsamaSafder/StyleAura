import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet,Footer,RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
