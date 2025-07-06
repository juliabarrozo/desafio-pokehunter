import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Pokemon } from './shared/pokemon';
import { PokemonService } from './shared/pokemon.service';
import { CreatePokemonDto } from './dto/pokemon.dto';

@Controller('pokemons')
export class PokemonsController {
    constructor(
        private pokemonService: PokemonService
    ) {}

    @Get()
    async getAll() : Promise<Pokemon[]> {
        return this.pokemonService.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: string): Promise<Pokemon> {
        return this.pokemonService.getById(id);
    }

    @Post()
    async create(@Body() createPokemonDto: CreatePokemonDto) {
        return this.pokemonService.create(createPokemonDto);
    }

    @Put(':id')
    async update(@Param('id') id:string, @Body() pokemon: Pokemon): Promise<Pokemon> {
        return this.pokemonService.update(id, pokemon);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        this.pokemonService.delete(id);
    }
}