import { SpotRepository } from 'src/repositories/SpotRepository';
import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { mockDeep } from 'jest-mock-extended';
import { CreateSpotUseCase } from './CreateSpot.usecase';

describe('CreateSpot Usecase', () => {
  const spotRepositoryMock = mockDeep<SpotRepository>();
  let createSpot: CreateSpotUseCase;

  beforeEach(async () => {
    jest.resetAllMocks();
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        CreateSpotUseCase,
        { provide: SpotRepository, useValue: spotRepositoryMock },
      ],
    }).compile();
    createSpot = app.get<CreateSpotUseCase>(CreateSpotUseCase);
  });

  it('should create spot', async () => {
    spotRepositoryMock.create.mockResolvedValueOnce({
      id: 1,
      oid: '1',
      name: 'A',
      active: true,
    });
    const spotDto = await createSpot.execute({
      name: 'A',
    });
    expect(spotDto).toEqual({
      id: '1',
      name: 'A',
      active: true,
    });
    expect(spotRepositoryMock.create).toHaveBeenCalledWith({
      name: 'A',
    });
  });
  it('should throw error if the name is invalid', async () => {
    await expect(() => createSpot.execute({ name: '' })).rejects.toThrow(
      BadRequestException,
    );
  });
});
