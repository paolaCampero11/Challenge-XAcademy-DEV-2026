import { Player } from '../../entities/player.entity';
import { FindAllOptions, IPlayerRepository, PaginatedResult } from '../../interfaces/player-repository.interface';

export class InMemoryPlayerRepository implements IPlayerRepository {
  private players: Player[] = [];
  private currentId = 1;

  async findAllPaginated(options: FindAllOptions): Promise<PaginatedResult<Player>> {
    return { data: [], total: 0, page: 1, limit: options.limit || 20, totalPages: 0 };
  }


  async create(data: Partial<Player>): Promise<Player> {
    const newPlayer = new Player();
    newPlayer.id = this.currentId++;
    newPlayer.name = data.name || '';
    newPlayer.club = data.club || '';
    newPlayer.position = data.position || '';
    newPlayer.nationality = data.nationality || '';
    newPlayer.rating = data.rating || 50;
    newPlayer.speed = data.speed || 50;
    newPlayer.shooting = data.shooting || 50;
    newPlayer.passing = data.passing || 50;
    newPlayer.dribbling = data.dribbling || 50;
    
    this.players.push(newPlayer);
    return newPlayer;
  }

  async findOneById(id: number): Promise<Player | undefined> {
    return Promise.resolve(this.players.find((p) => p.id === id));
  }

    async update(id: number, data: Partial<Player>): Promise<Player> {
    const index = this.players.findIndex(p => p.id === id);
    
    if (index === -1) {
      throw new Error('Jugador no encontrado');
    }

    this.players[index] = { 
      ...this.players[index], 
      ...data
    };

    return this.players[index];
  }
}
