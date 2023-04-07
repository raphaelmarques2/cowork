import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { mockDeep } from 'jest-mock-extended';
import { UserRepository } from 'src/repositories/UserRepository';
import { FindUserByEmailUseCase } from './FindUserByEmail.usecase';

describe('FindUserByEmail Usecase', () => {
  const userRepositoryMock = mockDeep<UserRepository>();
  let findUserByEmail: FindUserByEmailUseCase;

  beforeEach(async () => {
    jest.resetAllMocks();
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        FindUserByEmailUseCase,
        { provide: UserRepository, useValue: userRepositoryMock },
      ],
    }).compile();
    findUserByEmail = app.get<FindUserByEmailUseCase>(FindUserByEmailUseCase);
  });

  it('should find user by email ', async () => {
    userRepositoryMock.findByEmail.mockResolvedValueOnce({
      id: 1,
      oid: '1',
      name: 'A',
      email: 'a@test.com',
    });
    const userDto = await findUserByEmail.execute('a@test.com');
    expect(userDto).toEqual({
      id: '1',
      name: 'A',
      email: 'a@test.com',
    });
    expect(userRepositoryMock.findByEmail).toHaveBeenCalledWith('a@test.com');
  });
  it('should throw error if user does not exist', async () => {
    userRepositoryMock.findByEmail.mockResolvedValueOnce(null);
    await expect(() => findUserByEmail.execute('a@test.com')).rejects.toThrow(
      NotFoundException,
    );
  });
});
