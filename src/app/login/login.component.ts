// login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    const isAuthenticated = this.authService.login(this.username, this.password);
    if (isAuthenticated) {

      this.router.navigate(['/functionalities']);
    } else {
      // TODO: Handle invalid credentials
    }
  }
}
