import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'kanban-project';
  constructor(public authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout();
    // Redirect to the login page after logout
    this.router.navigate(['/login']);
  }
}
