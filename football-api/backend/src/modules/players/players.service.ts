import { Inject, Injectable } from '@nestjs/common';
import { FindAllOptions, IPlayerRepository, PaginatedResult } from './interfaces/player-repository.interface';
import { Player } from './entities/player.entity';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';

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
  
  async createPlayer(createPlayerDto: CreatePlayerDto): Promise<Player> {
    return this.playerRepository.create(createPlayerDto);
  }

  async updatePlayer(id: number, updatePlayerDto: UpdatePlayerDto): Promise<Player> {
    return this.playerRepository.update(id, updatePlayerDto);
  }
}
