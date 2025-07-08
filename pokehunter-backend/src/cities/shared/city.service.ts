import { Injectable, NotFoundException } from '@nestjs/common';
import { City } from './city';
import { HttpService } from '@nestjs/axios';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PokemonService } from 'src/pokemons/shared/pokemon.service';
import { Pokemon } from 'src/pokemons/shared/pokemon'
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CityService {

    constructor(
        @InjectModel('City') private readonly cityModel: Model <City>,
        private readonly httpService: HttpService,
        private readonly pokemonService: PokemonService,
    ) {};

    async getPokemonByCity(city: string) {
        const apiKey = '3c2116587db4d1d604c0c32226155e4e';
        const address = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const response = await lastValueFrom(this.httpService.get(address));
        const data = response.data;
        const temp = data.main.temp;
        const weather = data.weather[0].main.toLowerCase();
        const isRaining = ['rain', 'thunderstorm', 'drizzle'].includes(weather);

        let type: string;
        if (isRaining) {
        type = 'electric';
        } else {
        type = this.setPokemonType(temp);
        }


        const pokemon = await this.pokemonService.getPokemonByType(type);

        const newCity = await new this.cityModel({
        name: city,
        temp,
        weather,
        isRaining,
        typePokemon: type,
        pokemon: pokemon._id as Types.ObjectId,
        })
        await newCity.save();

        pokemon.city = newCity._id as Types.ObjectId;

        await pokemon.save();


        return {
        city,
        temp,
        weather,
        isRaining,
        typePokemon: type,
        pokemon,
        };
    } 

    setPokemonType(temp: number): string {
        if (temp < 5) return 'ice';
        if (temp >= 5 && temp < 10) return 'water';
        if (temp >= 12 && temp <= 15) return 'grass';
        if (temp >= 15 && temp <= 21) return 'ground';
        if (temp >= 23 && temp <= 27) return 'bug';
        if (temp >= 27 && temp <= 33) return 'rock';
        if (temp > 33) return 'fire';
        return 'normal';
    }
    
    // vai até o banco de dados e busca todas as cidades
    async getAll() {
        return await this.cityModel.find().exec();
    }

    async getById(id: string) {
        const city = await this.cityModel.findById(id).exec();
        if (! city) {
            throw new NotFoundException(`Não foi possível encontrar a cidade com o id ${id}`)
        }
        return city;
    }

    async create(city: City){
        const createdCity = new this.cityModel(city);
        return await createdCity.save();
    }

    async update(id: string, city: City) {
        await this.getById(id);
        const updatedCity = await this.cityModel.findByIdAndUpdate({_id: id}, city).exec();
        if (! updatedCity) {
            throw new NotFoundException(`Não foi possível fazer o update da cidade com id ${id}`)
        }
        return updatedCity;
       
    }

    async delete(id: string) {
        return await this.cityModel.deleteOne({_id:id}).exec()
    }
    
}