import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/application/dtos/UserDto';
import { UserRepository } from 'src/repositories/UserRepository';

@Injectable()
export class ListUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<UserDto[]> {
    const users = await this.userRepository.list();
    return users.map((user) => new UserDto(user));
  }
}
