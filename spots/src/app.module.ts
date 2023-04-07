import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService } from './services/Config.service';
import { PrismaService } from './services/Prisma.service';
import { PasswordService } from './services/Password.service';
import { JwtModule } from '@nestjs/jwt';
import { SpotController } from './controllers/spot.controller';
import { SpotRepository } from './repositories/SpotRepository';
import { ListSpotsUseCase } from './usecases/user/ListSpots.usecase';
import { CreateSpotUseCase } from './usecases/user/CreateSpot.usecase';
import { FindSpotByIdUseCase } from './usecases/user/FindSpotById.usecase';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      secret: process.env.JWT_SECRET!,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AppController, SpotController],
  providers: [
    PasswordService,
    AppService,
    PrismaService,
    ConfigService,
    SpotRepository,
    ListSpotsUseCase,
    CreateSpotUseCase,
    FindSpotByIdUseCase,
  ],
  exports: [ConfigService],
})
export class AppModule {}
