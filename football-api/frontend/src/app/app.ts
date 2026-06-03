import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlayerComponent } from './components/player/player';
import { PlayersList } from './pages/players-list/players-list';
import { Header } from './shared/components/header/header';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [
    Header,
    RouterOutlet,
  ],
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('frontend');
}
