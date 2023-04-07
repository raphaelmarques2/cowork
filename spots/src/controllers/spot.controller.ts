import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common/decorators';
import { AuthGuard } from 'src/guards/Auth.guard';
import {
  CreateSpotInputDto,
  CreateSpotUseCase,
} from 'src/usecases/user/CreateSpot.usecase';
import { FindSpotByIdUseCase } from 'src/usecases/user/FindSpotById.usecase';
import { ListSpotsUseCase } from 'src/usecases/user/ListSpots.usecase';

@Controller('/spots')
export class SpotController {
  constructor(
    private createSpotUseCase: CreateSpotUseCase,
    private listSpotsUseCase: ListSpotsUseCase,
    private findSpotByIdUseCase: FindSpotByIdUseCase,
  ) {}

  @UseGuards(AuthGuard)
  @Get('/:id')
  async findById(@Param('id') id: string) {
    return this.findSpotByIdUseCase.execute(id);
  }

  @Get()
  async listUsers() {
    return this.listSpotsUseCase.execute();
  }

  @Post()
  async signup(@Body() createSpotDto: CreateSpotInputDto) {
    return this.createSpotUseCase.execute(createSpotDto);
  }
}
