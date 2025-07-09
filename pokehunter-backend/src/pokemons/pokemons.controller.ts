import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Pokemon } from './shared/pokemon';
import { PokemonService } from './shared/pokemon.service';
import { CreatePokemonDto } from './dto/pokemon.dto';
import { JwtAuthGuard } from 'src/auth/shared/jwt-auth.guard';

@Controller('pokemons')
export class PokemonsController {
    constructor(
        private pokemonService: PokemonService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAll() : Promise<Pokemon[]> {
        return this.pokemonService.getAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getById(@Param('id') id: string): Promise<Pokemon> {
        return this.pokemonService.getById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() createPokemonDto: CreatePokemonDto) {
        return this.pokemonService.create(createPokemonDto);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(@Param('id') id:string, @Body() pokemon: Pokemon): Promise<Pokemon> {
        return this.pokemonService.update(id, pokemon);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: string) {
        this.pokemonService.delete(id);
    }
}