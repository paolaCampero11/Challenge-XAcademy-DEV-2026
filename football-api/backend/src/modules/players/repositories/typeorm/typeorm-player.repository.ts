import { Repository, Like } from 'typeorm';
import { Player } from '../../entities/player.entity';
import { FindAllOptions, IPlayerRepository, PaginatedResult } from '../../interfaces/player-repository.interface';
import { PlayerDto } from './player.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmPlayerRepository implements IPlayerRepository {
  constructor(
    @InjectRepository(PlayerDto)
    private readonly playerRepository: Repository<PlayerDto>,
  ) {}

  async findAllPaginated(options: FindAllOptions): Promise<PaginatedResult<Player>> {
    const { limit = 20, offset = 0, filters = {} } = options;
    const where: any = {};
    
    if (filters.name) where.longName = Like(`%${filters.name}%`);
    if (filters.club) where.clubName = Like(`%${filters.club}%`);
    if (filters.position) where.playerPositions = Like(`%${filters.position}%`);

    const total = await this.playerRepository.count({ where });
    const dtos = await this.playerRepository.find({ where, skip: offset, take: limit });
    const data = dtos.map((x) => this.mapToEntity(x));

    return {
      data,
      total,
      page: Math.floor(offset / limit) + 1,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOneById(id: number): Promise<Player | undefined> {
    const dto = await this.playerRepository.findOne({ where: { id } });
    if (dto === null) {
      return undefined;
    }

    const entity = this.mapToEntity(dto);

    return entity;
  }

  async create(data: Partial<Player>): Promise<Player> {
    const newPlayer = this.playerRepository.create({
      longName: data.name,
      clubName: data.club,
      playerPositions: data.position,
      nationalityName: data.nationality,
      overall: data.rating,
      pace: data.speed,
      shooting: data.shooting,
      passing: data.passing,
      dribbling: data.dribbling,
      fifaVersion: '23',
      fifaUpdate: '1',
    });
    
    const saved = await this.playerRepository.save(newPlayer);
    return this.mapToEntity(saved);
  }

  async update(id: number, data: Partial<Player>): Promise<Player> {
    const existingPlayer = await this.playerRepository.findOne({ where: { id } });
    if (existingPlayer === null) {
      throw new Error('Jugador no encontrado');
    }
    
    const updateData: any = {};
    if (data.name !== undefined) updateData.longName = data.name;
    if (data.club !== undefined) updateData.clubName = data.club;
    if (data.position !== undefined) updateData.playerPositions = data.position;
    if (data.nationality !== undefined) updateData.nationalityName = data.nationality;
    if (data.rating !== undefined) updateData.overall = data.rating;
    if (data.speed !== undefined) updateData.pace = data.speed;
    if (data.shooting !== undefined) updateData.shooting = data.shooting;
    if (data.passing !== undefined) updateData.passing = data.passing;
    if (data.dribbling !== undefined) updateData.dribbling = data.dribbling;

    const mergedData = { ...existingPlayer, ...updateData };

    const updatedModel = await this.playerRepository.save(mergedData);

    return this.mapToEntity(updatedModel);

  }

  private mapToEntity(playerDto: PlayerDto): Player {
    const player = new Player();
    player.id = playerDto.id;
    player.name = playerDto.longName;
    player.club = playerDto.clubName || 'Unknown Club';
    player.position = playerDto.playerPositions.split(',')[0].trim();
    player.nationality = playerDto.nationalityName || 'Unknown Nationality';
    player.rating = playerDto.overall;
    player.speed = playerDto.pace ?? 0; // Using nullish coalescing operator (??) for numeric defaults
    player.shooting = playerDto.shooting ?? 0;
    player.dribbling = playerDto.dribbling ?? 0;
    player.passing = playerDto.passing ?? 0;

    return player;
  }
}
