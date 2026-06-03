import { Component, OnInit } from '@angular/core';
import { PlayerComponent } from '../../components/player/player';
import { ActivatedRoute } from '@angular/router';
import { Player, PlayerService } from '../../services/player/player';
import { CommonModule } from '@angular/common';
import { PlayerChart } from '../../components/player-chart/player-chart';

@Component({
  selector: 'app-player-detail',
  standalone: true,
  imports: [
    PlayerChart
  ],
  providers: [
    PlayerService
  ],
  template: `<h2>Jugador ID: {{ id }}</h2>`,
  templateUrl: './player-detail.html',
  styleUrl: './player-detail.css',
})
export class PlayerDetail implements OnInit {
  id: string | null = null;
  player?: Player;
  errorMessage='';
  
  constructor(private route: ActivatedRoute,
    private playerService: PlayerService
  ) {}
  
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log("desde el detail", this.id);

    this.playerService.getPlayer(Number(this.id)).subscribe({
      next: (data) => {this.player = data
         console.log('🔵 DATOS RECIBIDOS EN PADRE:', data);
      console.log('🔵 Valores específicos:', {
        speed: data.speed,
        shooting: data.shooting,
        passing: data.passing,
        dribbling: data.dribbling
      });
      },
      error: (err) => (this.errorMessage = 'Jugador no encontrado'),
      
    });
    
  }

}
