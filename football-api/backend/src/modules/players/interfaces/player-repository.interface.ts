import { Player } from '../entities/player.entity';

export interface PlayerFilters {
  name?: string;
  club?: string;
  position?: string;
}

export interface FindAllOptions {
  limit?: number;
  offset?: number;
  filters?: PlayerFilters;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;      
  page: number;
  limit: number;
  totalPages: number;
}

export interface IPlayerRepository {
  findAllPaginated(options: FindAllOptions): Promise<PaginatedResult<Player>>;
  findOneById(id: number): Promise<Player | undefined>;
}
