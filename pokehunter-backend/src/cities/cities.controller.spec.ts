import { Test, TestingModule } from '@nestjs/testing';
import { CitiesController } from './cities.controller';
import { CityService } from './shared/city.service';

describe('CitiesController', () => {
  let controller: CitiesController;
  const mockCityService = {
  getAll: jest.fn(),
  getById: jest.fn(),
  create: jest.fn(),
};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CitiesController],
      providers: [
      {
        provide: CityService,
        useValue: mockCityService,
      },
    ],
    }).compile();

    controller = module.get<CitiesController>(CitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
