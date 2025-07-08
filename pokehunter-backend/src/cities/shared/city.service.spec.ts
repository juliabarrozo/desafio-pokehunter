import { Test, TestingModule } from '@nestjs/testing';
import { CityService } from './city.service';
import { getModelToken } from '@nestjs/mongoose';
import { HttpService } from '@nestjs/axios';
import { PokemonService } from 'src/pokemons/shared/pokemon.service';
import { of } from 'rxjs';
import { NotFoundException } from '@nestjs/common';

// Mock da classe Model do Mongoose para City
class CityModelMock {
  private data?: any;
  constructor(data?: any) {
    this.data = data;
  }

  save() {
    return Promise.resolve(this.data);
  }

  static find = jest.fn().mockReturnThis();
  static findById = jest.fn().mockReturnThis();
  static findByIdAndUpdate = jest.fn().mockReturnThis();
  static deleteOne = jest.fn().mockReturnThis();
  static exec = jest.fn();
}

describe('CityService', () => {
  let service: CityService;

  const mockHttpService = {
    get: jest.fn(),
  };

  const mockPokemonService = {
    getByType: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CityService,
        { provide: getModelToken('City'), useValue: CityModelMock },
        { provide: HttpService, useValue: mockHttpService },
        { provide: PokemonService, useValue: mockPokemonService },
      ],
    }).compile();

    service = module.get<CityService>(CityService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getPokemonByCity', () => {
  it('should fetch weather, get pokemon and save city correctly', async () => {
    const cityName = 'London';
    const weatherResponse = {
      data: {
        main: { temp: 20 },
        weather: [{ main: 'Clear' }],
      },
    };

    mockHttpService.get.mockReturnValue(of(weatherResponse));

    // ✅ Mock corrigido
    const mockedPokemon = {
      _id: 'abc123',
      name: 'bulbasaur',
      type: 'ground',
      image: 'url-image',
      save: jest.fn().mockResolvedValue(true),
    };

    mockPokemonService.getByType.mockResolvedValue(mockedPokemon);

    const saveCitySpy = jest.spyOn(CityModelMock.prototype, 'save');

    const result = await service.getPokemonByCity(cityName);

    expect(mockHttpService.get).toHaveBeenCalled();
    expect(mockPokemonService.getByType).toHaveBeenCalledWith('ground');
    expect(saveCitySpy).toHaveBeenCalled();
    expect(mockedPokemon.save).toHaveBeenCalled();
    expect(result.typePokemon).toBe('ground');
    expect(result.weather).toBe('clear');
    expect(result.city).toBe(cityName);
    expect(result.isRaining).toBe(false);
    expect(typeof result.pokemon.save).toBe('function');
  });

  it('should set type electric when weather is rain', async () => {
    const cityName = 'Seattle';
    const weatherResponse = {
      data: {
        main: { temp: 15 },
        weather: [{ main: 'Rain' }],
      },
    };

    mockHttpService.get.mockReturnValue(of(weatherResponse));

    // ✅ Mock corrigido
    const mockedPokemon = {
      _id: 'xyz789',
      name: 'pikachu',
      type: 'electric',
      image: 'url-pikachu',
      save: jest.fn().mockResolvedValue(true),
    };

    mockPokemonService.getByType.mockResolvedValue(mockedPokemon);

    const saveCitySpy = jest.spyOn(CityModelMock.prototype, 'save');

    const result = await service.getPokemonByCity(cityName);

    expect(mockHttpService.get).toHaveBeenCalled();
    expect(mockPokemonService.getByType).toHaveBeenCalledWith('electric');
    expect(saveCitySpy).toHaveBeenCalled();
    expect(mockedPokemon.save).toHaveBeenCalled();
    expect(result.typePokemon).toBe('electric');
    expect(result.isRaining).toBe(true);
    expect(typeof result.pokemon.save).toBe('function');
  });
});

      it('should return isRaining as true when weather is Rain', async () => {
      const cityName = 'Seattle';
      const weatherResponse = {
        data: {
          main: { temp: 19 },
          weather: [{ main: 'Rain' }],
        },
      };
      const pokemonMock = {
        _id: 'xyz789',
        name: 'pikachu',
        type: 'electric',
        image: 'url-pikachu',
      };

      mockHttpService.get.mockReturnValue(of(weatherResponse));
      mockPokemonService.getByType.mockResolvedValue(pokemonMock);

      const result = await service.getPokemonByCity(cityName);

      expect(result.isRaining).toBe(true);
      expect(result.weather.toLowerCase()).toBe('rain');
    });

    it('should return isRaining as false when weather is not Rain', async () => {
      const cityName = 'Cairo';
      const weatherResponse = {
        data: {
          main: { temp: 30 },
          weather: [{ main: 'Clear' }],
        },
      };
      const pokemonMock = {
        _id: 'abc321',
        name: 'onix',
        type: 'rock',
        image: 'url-onix',
      };

      mockHttpService.get.mockReturnValue(of(weatherResponse));
      mockPokemonService.getByType.mockResolvedValue(pokemonMock);

      const result = await service.getPokemonByCity(cityName);

      expect(result.isRaining).toBe(false);
      expect(result.weather.toLowerCase()).toBe('clear');
    });

  describe('setPokemonType', () => {
    it.each([
      [0, 'ice'],
      [5, 'water'],
      [7, 'water'],
      [13, 'grass'],
      [16, 'ground'],
      [25, 'bug'],
      [30, 'rock'],
      [35, 'fire'],
      [10, 'normal'], // default case
    ])('should return correct type for temp %d', (temp, expectedType) => {
      expect(service.setPokemonType(temp)).toBe(expectedType);
    });
  });

  describe('getAll', () => {
    it('should return list of cities', async () => {
      const citiesMock = [{ name: 'City1' }, { name: 'City2' }];
      CityModelMock.find.mockReturnThis();
      CityModelMock.exec.mockResolvedValue(citiesMock);

      const result = await service.getAll();

      expect(CityModelMock.find).toHaveBeenCalled();
      expect(CityModelMock.exec).toHaveBeenCalled();
      expect(result).toBe(citiesMock);
    });
  });

  describe('getById', () => {
    it('should return city when found', async () => {
      const cityMock = { _id: '1', name: 'City1' };
      CityModelMock.findById.mockReturnThis();
      CityModelMock.exec.mockResolvedValue(cityMock);

      const result = await service.getById('1');

      expect(CityModelMock.findById).toHaveBeenCalledWith('1');
      expect(result).toBe(cityMock);
    });

    it('should throw NotFoundException when city not found', async () => {
      CityModelMock.findById.mockReturnThis();
      CityModelMock.exec.mockResolvedValue(null);

      await expect(service.getById('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create and save city', async () => {
      const cityData = { name: 'New City' };

      const saveSpy = jest.spyOn(CityModelMock.prototype, 'save');

      const result = await service.create(cityData as any);

      expect(saveSpy).toHaveBeenCalled();
      expect(result).toEqual(cityData);
    });
  });

  describe('update', () => {
    it('should update city successfully', async () => {
      const cityData = { name: 'Updated City' };
      CityModelMock.findById.mockReturnThis();
      CityModelMock.exec.mockResolvedValue(cityData);
      CityModelMock.findByIdAndUpdate.mockReturnThis();
      CityModelMock.exec.mockResolvedValue(cityData);

      const result = await service.update('1', cityData as any);

      expect(CityModelMock.findById).toHaveBeenCalledWith('1');
      expect(CityModelMock.findByIdAndUpdate).toHaveBeenCalledWith({ _id: '1' }, cityData);
      expect(result).toBe(cityData);
    });

    it('should throw NotFoundException when update fails', async () => {
      CityModelMock.findById.mockReturnThis();
      CityModelMock.exec.mockResolvedValue(true);
      CityModelMock.findByIdAndUpdate.mockReturnThis();
      CityModelMock.exec.mockResolvedValue(null);

      await expect(service.update('1', {} as any)).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should call deleteOne', async () => {
      CityModelMock.deleteOne.mockReturnThis();
      CityModelMock.exec.mockResolvedValue({ deletedCount: 1 });

      const result = await service.delete('1');

      expect(CityModelMock.deleteOne).toHaveBeenCalledWith({ _id: '1' });
      expect(result).toEqual({ deletedCount: 1 });
    });
  });
});
