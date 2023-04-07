import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { mockDeep } from 'jest-mock-extended';
import { UserRepository } from 'src/repositories/UserRepository';
import { FindUserByIdUseCase } from './FindUserById.usecase';

describe('FindUserById Usecase', () => {
  const userRepositoryMock = mockDeep<UserRepository>();
  let findUserById: FindUserByIdUseCase;

  beforeEach(async () => {
    jest.resetAllMocks();
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        FindUserByIdUseCase,
        { provide: UserRepository, useValue: userRepositoryMock },
      ],
    }).compile();
    findUserById = app.get<FindUserByIdUseCase>(FindUserByIdUseCase);
  });

  it('should find user by id ', async () => {
    userRepositoryMock.findByOid.mockResolvedValueOnce({
      id: 1,
      oid: '1',
      name: 'A',
      email: 'a@test.com',
    });
    const userDto = await findUserById.execute('1');
    expect(userDto).toEqual({
      id: '1',
      name: 'A',
      email: 'a@test.com',
    });
    expect(userRepositoryMock.findByOid).toHaveBeenCalledWith('1');
  });
  it('should throw error if user does not exist', async () => {
    userRepositoryMock.findByOid.mockResolvedValueOnce(null);
    await expect(() => findUserById.execute('123')).rejects.toThrow(
      NotFoundException,
    );
  });
});
