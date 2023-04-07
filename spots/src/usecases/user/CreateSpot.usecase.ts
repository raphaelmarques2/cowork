import { createZodDto } from '@abitia/zod-dto';
import { Injectable } from '@nestjs/common';
import { SpotDto } from 'src/application/dtos/SpotDto';
import { SpotRepository } from 'src/repositories/SpotRepository';
import { validateSchema } from 'src/validation/validateSchema';
import { z } from 'zod';

export const createSpotInputSchema = z.object({
  name: z.string().min(1),
});
export class CreateSpotInputDto extends createZodDto(createSpotInputSchema) {}

@Injectable()
export class CreateSpotUseCase {
  constructor(private spotRepository: SpotRepository) {}

  async execute(input: CreateSpotInputDto): Promise<SpotDto> {
    validateSchema(input, createSpotInputSchema);

    const spot = await this.spotRepository.create({
      name: input.name,
    });
    return new SpotDto(spot);
  }
}
