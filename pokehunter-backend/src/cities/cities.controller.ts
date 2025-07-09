import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CityService } from './shared/city.service';
import { City } from './shared/city';
import { JwtAuthGuard } from 'src/auth/shared/jwt-auth.guard';

@Controller('cities')
export class CitiesController {
    constructor(
        private cityService: CityService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAll() : Promise<City[]> {
        return this.cityService.getAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getById(@Param('id') id: string): Promise<City> {
        return this.cityService.getById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/pokemon/:name')
    async getPokemonByCity(@Param('name') name: string) {
    return this.cityService.getPokemonByCity(name);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() city: City): Promise<City> {  
        return this.cityService.create(city);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(@Param('id') id:string, @Body() city: City): Promise<City> {
        return this.cityService.update(id, city);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: string) {
        this.cityService.delete(id);
    }
}
