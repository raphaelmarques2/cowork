import { Injectable } from '@nestjs/common';
import { SpotDto } from 'src/application/dtos/SpotDto';

import { SpotRepository } from 'src/repositories/SpotRepository';

@Injectable()
export class ListSpotsUseCase {
  constructor(private spotRepository: SpotRepository) {}

  async execute(): Promise<SpotDto[]> {
    const spots = await this.spotRepository.list();
    return spots.map((spot) => new SpotDto(spot));
  }
}
