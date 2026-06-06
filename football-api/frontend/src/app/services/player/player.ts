// src/app/services/player.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as XLSX from 'xlsx';

export interface Player {
  id: number;
  name: string;
  club: string;
  position: string;
  nationality: string;
  rating: number;
  speed: number;
  shooting: number;
  dribbling: number;
  passing: number;
}

export interface PlayerResponse {
  data: any [],
  total: number,
  page: number,
  limit: number,
  totalPages: number,
}

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private baseUrl = 'http://localhost:3000/api/players';

  constructor(private http: HttpClient) {}

  getPlayers(page: number = 1, limit: number = 10, name?: string, club?: string, position?: string): Observable<PlayerResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (name) params = params.set('name', name);
    if (club) params = params.set('club', club);
    if (position) params = params.set('position', position);

    return this.http.get<PlayerResponse>(this.baseUrl, { params });
  }
  
  getPlayer(id: number): Observable<Player> {
    return this.http.get<Player>(`${this.baseUrl}/${id}`);
  }

  createPlayer(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/players', data);
  }

  updatePlayer(id: number, data: any): Observable<any> {
    return this.http.put(`http://localhost:3000/api/players/${id}`, data);
  }

  exportToCsv(players: Player[]) {
    const dataToExport = players.map(player => ({
      'Nombre': player.name,
      'Club': player.club,
      'Posición': player.position,
      'Nacionalidad': player.nationality,
      'Rating': player.rating,
      'Velocidad': player.speed,
      'Tiro': player.shooting,
      'Pase': player.passing,
      'Regate': player.dribbling
    }));

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Jugadores');

    XLSX.writeFile(workbook, 'listado_jugadores_filtrado.csv', { bookType: 'csv' });
  }
}
