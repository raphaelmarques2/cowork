import { Test, TestingModule } from '@nestjs/testing';
import { mockDeep } from 'jest-mock-extended';
import { UserRepository } from 'src/repositories/UserRepository';
import { ListUsersUseCase } from './ListUsers.usecase';

describe('ListUsers Usecase', () => {
  const userRepositoryMock = mockDeep<UserRepository>();
  let listUsers: ListUsersUseCase;

  beforeEach(async () => {
    jest.resetAllMocks();
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        ListUsersUseCase,
        { provide: UserRepository, useValue: userRepositoryMock },
      ],
    }).compile();
    listUsers = app.get<ListUsersUseCase>(ListUsersUseCase);
  });

  it('should list users', async () => {
    userRepositoryMock.list.mockResolvedValueOnce([
      {
        id: 1,
        oid: '1',
        name: 'A',
        email: 'a@test.com',
      },
    ]);
    const users = await listUsers.execute();
    expect(users).toHaveLength(1);
    expect(users).toMatchObject([
      {
        id: '1',
        name: 'A',
        email: 'a@test.com',
      },
    ]);
    expect(userRepositoryMock.list).toHaveBeenCalledWith();
  });
  it('should empty list of users', async () => {
    userRepositoryMock.list.mockResolvedValueOnce([]);
    const users = await listUsers.execute();
    expect(users).toHaveLength(0);
    expect(userRepositoryMock.list).toHaveBeenCalledWith();
  });
});
