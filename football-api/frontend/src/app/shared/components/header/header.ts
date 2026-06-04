import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

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
  navLinks = [
    { path: '/jugadores', label: 'Jugadores' },
    { path: '/login', label: 'Inicio de sesión' },
    { path: '/jugadores/nuevo', label: 'Registrar jugador' }
  ];
}
