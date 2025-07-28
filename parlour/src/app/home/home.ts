import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet,Footer],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
