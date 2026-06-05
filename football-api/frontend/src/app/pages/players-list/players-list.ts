import { Component, OnInit } from '@angular/core';
import { PlayerResponse, PlayerService } from '../../services/player/player';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-players-list',
  imports: [
    CommonModule, 
    FormsModule,
    RouterModule
  ],
  providers: [PlayerService],
  templateUrl: './players-list.html',
  styleUrl: './players-list.css',
})
export class PlayersList implements OnInit {
  players: any[] = [];
  loading = false;
  error: string | null = null;

  // Estado de paginación
  currentPage = 1;
  limit = 15;
  totalPages = 1;
  totalPlayers = 0;

  // Estado de los filtros
  filterName = '';
  filterClub = '';
  filterPosition = '';

  constructor(private playerService: PlayerService,
    private router: Router 
  ) {}

  ngOnInit() {
    this.loadPlayers();
  }

  loadPlayers() {
    this.loading = true;
    this.error = null;

    this.playerService.getPlayers(
      this.currentPage,
      this.limit,
      this.filterName,
      this.filterClub,
      this.filterPosition
    ).subscribe({
      next: (response: PlayerResponse) => {
        this.players = response.data;
        this.totalPages = response.totalPages;
        this.totalPlayers = response.total;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error:', err);
        this.error = 'No se pudieron cargar los jugadores. Revisá el backend.';
        this.loading = false;
      }
    });
  }

  applyFilters() {
    this.currentPage = 1;
    this.loadPlayers();
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadPlayers();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPlayers();
    }
  }

  verDetalle(id: number) {
    this.router.navigate(['/jugadores', id]);    
  }
}
