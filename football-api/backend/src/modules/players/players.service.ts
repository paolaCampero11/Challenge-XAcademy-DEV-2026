import { Inject, Injectable } from '@nestjs/common';
import { FindAllOptions, IPlayerRepository, PaginatedResult } from './interfaces/player-repository.interface';
import { Player } from './entities/player.entity';

@Injectable()
export class PlayersService {
  constructor(
    @Inject('IPlayerRepository')
    private readonly playerRepository: IPlayerRepository,
  ) {}

  getAllPlayersPaginated(options: FindAllOptions): Promise<PaginatedResult<Player>> {
    return this.playerRepository.findAllPaginated(options);
  }

  getPlayerById(id: number): Promise<Player | undefined> {
    return this.playerRepository.findOneById(id);
  }
  
}
