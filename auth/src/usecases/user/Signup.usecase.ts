import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repositories/UserRepository';
import { z } from 'zod';
import { createZodDto } from '@abitia/zod-dto';
import { UserDto } from 'src/application/dtos/UserDto';
import { validateSchema } from 'src/validation/validateSchema';
import { PasswordService } from 'src/services/Password.service';

export const signupInputSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(3),
});
export class SignupInputDto extends createZodDto(signupInputSchema) {}

@Injectable()
export class SignupUseCase {
  constructor(
    private userRepository: UserRepository,
    private passwordService: PasswordService,
  ) {}

  async execute(input: SignupInputDto): Promise<UserDto> {
    validateSchema(input, signupInputSchema);

    const existingUser = await this.userRepository.findByEmail(input.email);
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await this.passwordService.hashPassword(
      input.password,
    );

    const user = await this.userRepository.create({
      name: input.name,
      email: input.email,
      password: hashedPassword,
    });

    return new UserDto(user);
  }
}
