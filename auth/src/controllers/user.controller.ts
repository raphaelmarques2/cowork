import { Controller, Get, Param, UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from 'src/guards/Auth.guard';
import { FindUserByEmailUseCase } from 'src/usecases/user/FindUserByEmail.usecase';
import { FindUserByIdUseCase } from 'src/usecases/user/FindUserById.usecase';
import { ListUsersUseCase } from 'src/usecases/user/ListUsers.usecase';

@Controller('/users')
export class UserController {
  constructor(
    private findUserByIdUseCase: FindUserByIdUseCase,
    private findUserByEmailUseCase: FindUserByEmailUseCase,
    private listUsersUseCase: ListUsersUseCase,
  ) {}

  @UseGuards(AuthGuard)
  @Get('/:idOrEmail')
  async findByIdOrEmail(@Param('idOrEmail') idOrEmail: string) {
    if (idOrEmail.includes('@')) {
      return this.findUserByEmailUseCase.execute(idOrEmail);
    } else {
      return this.findUserByIdUseCase.execute(idOrEmail);
    }
  }

  @Get()
  async listUsers() {
    return this.listUsersUseCase.execute();
  }
}
