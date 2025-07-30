import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; // ✅ Import Router and RouterModule

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule,CommonModule], // ✅ Import RouterModule here
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginFailed: boolean = false;

  constructor(private router: Router) {}

  onLogin(): void {
    if (this.username === 'admin' && this.password === '12345') {
      this.router.navigate(['/admindashboard']);  // Update this path as needed
    } else {
      this.loginFailed = true;
    }
  }
  
}
