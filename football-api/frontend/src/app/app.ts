import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlayerComponent } from './components/player/player';
import { PlayersList } from './components/players-list/players-list';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [
    PlayerComponent,
    PlayersList,
  ],
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('frontend');
}
