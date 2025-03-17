import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLinkActive,RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLinkActive,RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router: Router) {}

  logout() {
    // Add your logout logic here
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
