import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CityService } from './shared/city.service';
import { City } from './shared/city';

@Controller('cities')
export class CitiesController {
    constructor(
        private cityService: CityService
    ) {}

    @Get()
    async getAll() : Promise<City[]> {
        return this.cityService.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: string): Promise<City> {
        return this.cityService.getById(id);
    }

    @Get('/pokemon/:name')
    async getPokemonByCity(@Param('name') name: string) {
    return this.cityService.getPokemonByCity(name);
    }

    @Post()
    async create(@Body() city: City): Promise<City> {  
        return this.cityService.create(city);
    }

    @Put(':id')
    async update(@Param('id') id:string, @Body() city: City): Promise<City> {
        return this.cityService.update(id, city);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        this.cityService.delete(id);
    }
}
