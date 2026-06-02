import { Player } from '../../entities/player.entity';
import { FindAllOptions, IPlayerRepository, PaginatedResult } from '../../interfaces/player-repository.interface';

export class InMemoryPlayerRepository implements IPlayerRepository {
  private players: Player[] = [];

  async findAllPaginated(options: FindAllOptions): Promise<PaginatedResult<Player>> {
    return { data: [], total: 0, page: 1, limit: options.limit || 20, totalPages: 0 };
  }

  async findOneById(id: number): Promise<Player | undefined> {
    return Promise.resolve(this.players.find((p) => p.id === id));
  }
}
