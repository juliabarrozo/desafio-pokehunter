import { Test, TestingModule } from '@nestjs/testing';
import { PokemonService } from './pokemon.service';
import { getModelToken } from '@nestjs/mongoose';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';

describe('PokemonService', () => {
  let service: PokemonService;

  const mockSave = jest.fn();

  const mockPokemonModel = function (this: any, dto: any) {
    this.save = mockSave.mockResolvedValue(dto);
  };

  mockPokemonModel.find = jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue([
      {
        name: 'pikachu',
        type: 'electric',
        image: 'https://example.com/pikachu.png',
      },
    ]),
  });

  const mockHttpService = {
    get: jest.fn().mockReturnValue(of({ data: {} })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PokemonService,
        {
          provide: getModelToken('Pokemon'),
          useValue: mockPokemonModel,
        },
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
      ],
    }).compile();

    service = module.get<PokemonService>(PokemonService);
  });

  it('deve criar um novo pokémon', async () => {
    const pokemonDto = {
      name: 'pikachu',
      type: 'electric',
      image: 'https://example.com/pikachu.png',
    };

    const result = await service.create(pokemonDto);
    expect(result).toEqual(pokemonDto);
  });

  it('deve retornar uma lista de pokémons', async () => {
    const result = await service.getAll();
    expect(result).toEqual([
      {
        name: 'pikachu',
        type: 'electric',
        image: 'https://example.com/pikachu.png',
      },
    ]);
  });
});
