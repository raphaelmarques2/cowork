import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from 'src/application/dtos/UserDto';
import { UserRepository } from 'src/repositories/UserRepository';

@Injectable()
export class FindUserByIdUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<UserDto> {
    const user = await this.userRepository.findByOid(id);
    if (!user) throw new NotFoundException(`User not found with id [${id}]`);
    return new UserDto(user);
  }
}
