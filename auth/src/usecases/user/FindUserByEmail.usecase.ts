import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from 'src/application/dtos/UserDto';
import { UserRepository } from 'src/repositories/UserRepository';

@Injectable()
export class FindUserByEmailUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(email: string): Promise<UserDto> {
    const user = await this.userRepository.findByEmail(email);
    if (!user)
      throw new NotFoundException(`User not found with email [${email}]`);
    return new UserDto(user);
  }
}
