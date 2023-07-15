import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: User | null = null;

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'password') {
      this.currentUser = {
        id: 1,
        username: username,
        password: password
      };
      return true;
    }

    return false;
  }

  logout(): void {
    this.currentUser = null;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }
}
