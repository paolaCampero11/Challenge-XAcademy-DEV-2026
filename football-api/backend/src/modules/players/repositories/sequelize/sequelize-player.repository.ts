import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { PlayerModel } from './player.model'; // Sequelize model
import { FindAllOptions, IPlayerRepository, PaginatedResult } from '../../interfaces/player-repository.interface';
import { Player } from '../../entities/player.entity';

@Injectable()
export class SequelizePlayerRepository implements IPlayerRepository {
  constructor(
    @InjectModel(PlayerModel)
    private readonly playerModel: typeof PlayerModel,
  ) {}

  async findAllPaginated(options: FindAllOptions): Promise<PaginatedResult<Player>> {
    const { limit = 20, offset = 0, filters = {} } = options;

    const where: any = {};

    if (filters.name) {
      where.longName = { [Op.like]: `%${filters.name}%` }; 
    }
    if (filters.club) {
      where.clubName = { [Op.like]: `%${filters.club}%` };
    }
    if (filters.position) {
      where.playerPositions = { [Op.like]: `%${filters.position}%` };
    }

    const total = await this.playerModel.count({ where });

    const playerList = await this.playerModel.findAll({
      where,
      limit,
      offset,
    });

    const data = playerList.map((x) => this.mapToEntity(x));

    return {
      data,
      total,
      page: Math.floor(offset / limit) + 1,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOneById(id: number): Promise<Player | undefined> {
    const model = await this.playerModel.findByPk(id);
    if (!model) {
      return undefined;
    }
    return this.mapToEntity(model);
  }

  private mapToEntity(model: PlayerModel): Player {
    console.log('Mapping PlayerModel to Player entity:', model);
    if (!model) {
      throw new Error('Attempted to map null model to Player entity');
    }
    const player = new Player();
    player.id = model.id;
    player.name = model.longName;
    player.club = model.clubName || 'Unknown Club';
    player.position = model.playerPositions?.split(',')[0].trim() ?? 'Unknown';
    player.nationality = model.nationalityName || 'Unknown Nationality';
    player.rating = model.overall;
    player.speed = model.pace ?? 0;
    player.shooting = model.shooting ?? 0;
    player.dribbling = model.dribbling ?? 0;
    player.passing = model.passing ?? 0;

    return player;
  }
}
