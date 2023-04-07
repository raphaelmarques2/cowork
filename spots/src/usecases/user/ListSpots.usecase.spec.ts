import { Test, TestingModule } from '@nestjs/testing';
import { mockDeep } from 'jest-mock-extended';
import { SpotRepository } from 'src/repositories/SpotRepository';
import { ListSpotsUseCase } from './ListSpots.usecase';

describe('ListSpots Usecase', () => {
  const spotRepositoryMock = mockDeep<SpotRepository>();
  let listSpots: ListSpotsUseCase;

  beforeEach(async () => {
    jest.resetAllMocks();
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        ListSpotsUseCase,
        { provide: SpotRepository, useValue: spotRepositoryMock },
      ],
    }).compile();
    listSpots = app.get<ListSpotsUseCase>(ListSpotsUseCase);
  });

  it('should list spots', async () => {
    spotRepositoryMock.list.mockResolvedValueOnce([
      {
        id: 1,
        oid: '1',
        name: 'A',
        active: true,
      },
    ]);
    const spots = await listSpots.execute();
    expect(spots).toHaveLength(1);
    expect(spots).toMatchObject([
      {
        id: '1',
        name: 'A',
        active: true,
      },
    ]);
    expect(spotRepositoryMock.list).toHaveBeenCalledWith();
  });
  it('should empty list of spots', async () => {
    spotRepositoryMock.list.mockResolvedValueOnce([]);
    const spots = await listSpots.execute();
    expect(spots).toHaveLength(0);
    expect(spotRepositoryMock.list).toHaveBeenCalledWith();
  });
});
