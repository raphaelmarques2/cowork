import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { AuthGuard } from 'src/guards/Auth.guard';
import { PasswordService } from 'src/services/Password.service';
import {
  BasicLoginInputDto,
  BasicLoginUseCase,
} from 'src/usecases/user/BasicLogin.usecase';
import {
  SignupInputDto,
  SignupUseCase,
} from 'src/usecases/user/Signup.usecase';

@Controller('/auth')
export class AuthController {
  constructor(
    private signupUseCase: SignupUseCase,
    private basicLoginUseCase: BasicLoginUseCase,
    private passwordService: PasswordService,
  ) {}

  @Post('/signup')
  async signup(@Body() signupDto: SignupInputDto) {
    return this.signupUseCase.execute(signupDto);
  }

  @Post('/login')
  async login(@Body() loginDto: BasicLoginInputDto) {
    return this.basicLoginUseCase.execute(loginDto);
  }

  @UseGuards(AuthGuard)
  @Get('/me')
  async me(@Request() req: ExpressRequest) {
    return (req as any).user;
  }
}
