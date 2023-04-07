import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { mockDeep } from 'jest-mock-extended';
import { UserRepository } from 'src/repositories/UserRepository';
import { SignupUseCase } from './Signup.usecase';
import { PasswordService } from 'src/services/Password.service';

describe('Signup Usecase', () => {
  const userRepositoryMock = mockDeep<UserRepository>();
  let signup: SignupUseCase;

  beforeEach(async () => {
    jest.resetAllMocks();
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        SignupUseCase,
        { provide: UserRepository, useValue: userRepositoryMock },
        PasswordService,
      ],
    }).compile();
    signup = app.get<SignupUseCase>(SignupUseCase);
  });

  it('should signup user', async () => {
    userRepositoryMock.create.mockResolvedValueOnce({
      id: 1,
      oid: '1',
      name: 'A',
      email: 'a@test.com',
    });
    const userDto = await signup.execute({
      name: 'A',
      email: 'a@test.com',
      password: 'abc',
    });
    expect(userDto).toEqual({
      id: '1',
      name: 'A',
      email: 'a@test.com',
    });
    expect(userRepositoryMock.create).toHaveBeenCalledWith({
      name: 'A',
      email: 'a@test.com',
      password: expect.not.stringMatching('abc'),
    });
  });
  it('should throw error if password is invalid', async () => {
    await expect(() =>
      signup.execute({
        name: 'A',
        email: 'a@test.com',
        password: '',
      }),
    ).rejects.toThrow(BadRequestException);
  });
  it('should throw error if email is invalid', async () => {
    await expect(() =>
      signup.execute({
        name: 'A',
        email: 'x',
        password: 'abc',
      }),
    ).rejects.toThrow(BadRequestException);
  });
  it('should throw error if name is invalid', async () => {
    await expect(() =>
      signup.execute({
        name: '',
        email: 'a@test.com',
        password: 'abc',
      }),
    ).rejects.toThrow(BadRequestException);
  });
});
