import { createZodDto } from '@abitia/zod-dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CredentialType } from '@prisma/client';
import { UserDto } from 'src/application/dtos/UserDto';
import { UserRepository } from 'src/repositories/UserRepository';
import { PasswordService } from 'src/services/Password.service';
import { JwtTokenPayload } from 'src/types/global';
import { validateSchema } from 'src/validation/validateSchema';
import { z } from 'zod';

export const basicLoginInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
});
export class BasicLoginInputDto extends createZodDto(basicLoginInputSchema) {}

@Injectable()
export class BasicLoginUseCase {
  constructor(
    private userRepository: UserRepository,
    private passwordService: PasswordService,
    private jwtService: JwtService,
  ) {}

  async execute(input: BasicLoginInputDto) {
    validateSchema(input, basicLoginInputSchema);

    const user =
      await this.userRepository.findUserAndCredentialsByEmailAndCredentialsType(
        input.email,
        CredentialType.BASIC,
      );

    if (!user) {
      throw new UnauthorizedException();
    }
    if (user.credentials.length == 0) {
      throw new UnauthorizedException();
    }

    const credential = user.credentials[0];
    if (!credential.password) {
      throw new UnauthorizedException();
    }

    const isValidPassword = await this.passwordService.checkPasswords(
      input.password,
      credential.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException();
    }

    const tokenPayload: JwtTokenPayload = {
      username: user.email,
      sub: user.oid,
    };
    const accessToken = await this.jwtService.signAsync(tokenPayload);

    return {
      ...new UserDto(user),
      accessToken,
    };
  }
}
