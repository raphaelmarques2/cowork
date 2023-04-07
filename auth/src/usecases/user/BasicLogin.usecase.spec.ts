import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { CredentialType } from '@prisma/client';
import { mockDeep } from 'jest-mock-extended';
import { UserRepository } from 'src/repositories/UserRepository';
import { PasswordService } from 'src/services/Password.service';
import { BasicLoginUseCase } from './BasicLogin.usecase';

describe('BasicLogin Usecase', () => {
  const userRepositoryMock = mockDeep<UserRepository>();
  const jwtServiceMock = mockDeep<JwtService>();
  let login: BasicLoginUseCase;
  let passwordService: PasswordService;

  beforeEach(async () => {
    jest.resetAllMocks();
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        BasicLoginUseCase,
        { provide: UserRepository, useValue: userRepositoryMock },
        PasswordService,
        { provide: JwtService, useValue: jwtServiceMock },
      ],
    }).compile();
    login = app.get<BasicLoginUseCase>(BasicLoginUseCase);
    passwordService = app.get<PasswordService>(PasswordService);
  });

  it('should login user', async () => {
    const hashedPassword = await passwordService.hashPassword('abc');
    userRepositoryMock.findUserAndCredentialsByEmailAndCredentialsType.mockResolvedValueOnce(
      {
        id: 1,
        oid: '1',
        name: 'A',
        email: 'a@test.com',
        credentials: [
          { id: 2, password: hashedPassword, type: 'BASIC', userId: 1 },
        ],
      },
    );
    jwtServiceMock.signAsync.mockResolvedValue('token');

    const result = await login.execute({
      email: 'a@test.com',
      password: 'abc',
    });
    expect(result).toEqual({
      id: '1',
      name: 'A',
      email: 'a@test.com',
      accessToken: 'token',
    });

    expect(
      userRepositoryMock.findUserAndCredentialsByEmailAndCredentialsType,
    ).toHaveBeenCalledWith('a@test.com', CredentialType.BASIC);

    expect(jwtServiceMock.signAsync).toHaveBeenCalledWith({
      username: 'a@test.com',
      sub: '1',
    });
  });
  it('should throw error if password is invalid', async () => {
    const hashedPassword = await passwordService.hashPassword('abc');
    userRepositoryMock.findUserAndCredentialsByEmailAndCredentialsType.mockResolvedValueOnce(
      {
        id: 1,
        oid: '1',
        name: 'A',
        email: 'a@test.com',
        credentials: [
          { id: 2, password: hashedPassword, type: 'BASIC', userId: 1 },
        ],
      },
    );
    await expect(() =>
      login.execute({
        email: 'a@test.com',
        password: 'xyz',
      }),
    ).rejects.toThrow(UnauthorizedException);
  });
  it('should throw error the user has ho credential', async () => {
    const hashedPassword = await passwordService.hashPassword('abc');
    userRepositoryMock.findUserAndCredentialsByEmailAndCredentialsType.mockResolvedValueOnce(
      {
        id: 1,
        oid: '1',
        name: 'A',
        email: 'a@test.com',
        credentials: [],
      },
    );
    await expect(() =>
      login.execute({
        email: 'a@test.com',
        password: 'xyz',
      }),
    ).rejects.toThrow(UnauthorizedException);
  });
  it('should throw error the has BASIC credential without password', async () => {
    userRepositoryMock.findUserAndCredentialsByEmailAndCredentialsType.mockResolvedValueOnce(
      {
        id: 1,
        oid: '1',
        name: 'A',
        email: 'a@test.com',
        credentials: [{ id: 2, password: null, type: 'BASIC', userId: 1 }],
      },
    );
    await expect(() =>
      login.execute({
        email: 'a@test.com',
        password: 'xyz',
      }),
    ).rejects.toThrow(UnauthorizedException);
  });
});
