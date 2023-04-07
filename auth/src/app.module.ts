import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './controllers/auth.controller';
import { UserController } from './controllers/user.controller';
import { UserRepository } from './repositories/UserRepository';
import { ConfigService } from './services/Config.service';
import { PrismaService } from './services/Prisma.service';
import { FindUserByEmailUseCase } from './usecases/user/FindUserByEmail.usecase';
import { FindUserByIdUseCase } from './usecases/user/FindUserById.usecase';
import { SignupUseCase } from './usecases/user/Signup.usecase';
import { PasswordService } from './services/Password.service';
import { JwtModule } from '@nestjs/jwt';
import { BasicLoginUseCase } from './usecases/user/BasicLogin.usecase';
import { ListUsersUseCase } from './usecases/user/ListUsers.usecase';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      secret: process.env.JWT_SECRET!,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AppController, AuthController, UserController],
  providers: [
    PasswordService,
    AppService,
    PrismaService,
    UserRepository,
    ConfigService,
    BasicLoginUseCase,
    SignupUseCase,
    FindUserByIdUseCase,
    FindUserByEmailUseCase,
    ListUsersUseCase,
  ],
  exports: [ConfigService],
})
export class AppModule {}
