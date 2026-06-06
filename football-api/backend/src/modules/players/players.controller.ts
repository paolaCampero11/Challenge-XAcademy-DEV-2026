import {
  Controller,
  Get,
  Post,
  Put,
  Body, 
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
  
} from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayerDto } from './dto/player.dto';
import { FindAllOptions } from './interfaces/player-repository.interface';
import { Player } from './entities/player.entity';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('api/players')
@UseGuards(JwtAuthGuard)
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

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createPlayer(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playersService.createPlayer(createPlayerDto);
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

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  updatePlayer(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePlayerDto: UpdatePlayerDto ){
    return this.playersService.updatePlayer(id, updatePlayerDto);
  }

}
