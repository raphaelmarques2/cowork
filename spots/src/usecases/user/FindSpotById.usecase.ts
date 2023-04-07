import { Injectable, NotFoundException } from '@nestjs/common';
import { SpotDto } from 'src/application/dtos/SpotDto';
import { SpotRepository } from 'src/repositories/SpotRepository';

@Injectable()
export class FindSpotByIdUseCase {
  constructor(private spotRepository: SpotRepository) {}

  async execute(id: string): Promise<SpotDto> {
    const spot = await this.spotRepository.findByOid(id);
    if (!spot) throw new NotFoundException(`Spot not found with id [${id}]`);
    return new SpotDto(spot);
  }
}
