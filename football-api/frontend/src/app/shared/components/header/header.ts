import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth/auth';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  constructor( public authService: AuthService,
    private router: Router
  ){}

   logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  /* 
  navLinks = [
    { path: '/jugadores', label: 'Jugadores' },
    { path: '/login', label: 'Inicio de sesión' },
    { path: '/jugadores/nuevo', label: 'Registrar jugador' }
  ]; */
}
