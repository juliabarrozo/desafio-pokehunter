import { Test, TestingModule } from '@nestjs/testing';
import { CityService } from './city.service';
import { getModelToken } from '@nestjs/mongoose';
import { HttpService } from '@nestjs/axios';
import { PokemonService } from 'src/pokemons/shared/pokemon.service';

describe('CityService', () => {
  let service: CityService;
  
  const mockCityModel = {
    find: jest.fn().mockReturnThis(),
    findById: jest.fn().mockReturnThis(),
    findByIdAndUpdate: jest.fn().mockReturnThis(),
    deleteOne: jest.fn().mockReturnThis(),
    exec: jest.fn(),
    save: jest.fn(),
  };

  // Mock do HttpService
  const mockHttpService = {
    get: jest.fn(),
  };

  // Mock do PokemonService
  const mockPokemonService = {
    getByType: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({

      providers: [
      CityService,
      { provide: getModelToken('City'), useValue: mockCityModel },
      { provide: HttpService, useValue: mockHttpService },
      { provide: PokemonService, useValue: mockPokemonService },
    ],
    }).compile();

    service = module.get<CityService>(CityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
