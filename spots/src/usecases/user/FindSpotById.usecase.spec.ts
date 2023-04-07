import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { mockDeep } from 'jest-mock-extended';
import { SpotRepository } from 'src/repositories/SpotRepository';
import { FindSpotByIdUseCase } from './FindSpotById.usecase';

describe('FindSpotById Usecase', () => {
  const spotRepositoryMock = mockDeep<SpotRepository>();
  let findSpotById: FindSpotByIdUseCase;

  beforeEach(async () => {
    jest.resetAllMocks();
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        FindSpotByIdUseCase,
        { provide: SpotRepository, useValue: spotRepositoryMock },
      ],
    }).compile();
    findSpotById = app.get<FindSpotByIdUseCase>(FindSpotByIdUseCase);
  });

  it('should find spot by id ', async () => {
    spotRepositoryMock.findByOid.mockResolvedValueOnce({
      id: 1,
      oid: '1',
      name: 'A',
      active: true,
    });
    const spotDto = await findSpotById.execute('1');
    expect(spotDto).toEqual({
      id: '1',
      name: 'A',
      active: true,
    });
    expect(spotRepositoryMock.findByOid).toHaveBeenCalledWith('1');
  });
  it('should throw error if spot does not exist', async () => {
    spotRepositoryMock.findByOid.mockResolvedValueOnce(null);
    await expect(() => findSpotById.execute('123')).rejects.toThrow(
      NotFoundException,
    );
  });
});
