import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Query, 
} from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayerDto } from './dto/player.dto';
import { FindAllOptions } from './interfaces/player-repository.interface';
import { Player } from './entities/player.entity';

@Controller('api/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllPlayers(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('name') name?: string,
    @Query('club') club?: string,
    @Query('position') position?: string,
  ): Promise<{ data: Player[]; total: number; page: number; limit: number; totalPages: number }> {
    const safeLimit = limit ? Math.min(Number(limit), 100) : 20; 
    const safePage = page ? Math.max(Number(page), 1) : 1; 
    const offset = (safePage - 1) * safeLimit;

    const options: FindAllOptions = {
      limit: safeLimit,
      offset,
      filters: { name, club, position },
    };

    return await this.playersService.getAllPlayersPaginated(options);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getPlayerById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PlayerDto | undefined> {
    const player = await this.playersService.getPlayerById(id);
    console.log(`Fetching player  ${player}`);
    if (!player) {
      throw new NotFoundException(`Player with ID ${id} not found.`);
    }

    return new PlayerDto(player);
  }
}
