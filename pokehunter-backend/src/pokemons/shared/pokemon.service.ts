import { Injectable, NotFoundException } from '@nestjs/common';
import { Pokemon } from './pokemon';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { CreatePokemonDto } from '../dto/pokemon.dto';

@Injectable()
export class PokemonService {
    
    constructor(
        @InjectModel('Pokemon') private readonly pokemonModel: Model <Pokemon>,
        private readonly httpService: HttpService,
) {};
    
    async getByType(type: string): Promise<Pokemon> {
    const existente = await this.pokemonModel.findOne({ type: type }).exec();
    if (existente) {
      return existente;
    }

    // Se não achou, busca na PokéAPI
    const urlType = `https://pokeapi.co/api/v2/type/${type}`;
    const responseType: any = await lastValueFrom(this.httpService.get(urlType));
    const pokemonsList = responseType.data.pokemon;

    if (! pokemonsList || pokemonsList.length === 0) {
      throw new NotFoundException(`Nenhum Pokémon do tipo ${type} encontrado na PokéAPI`);
    }

    // Seleciona um Pokémon aleatório
    const randomIndex = Math.floor(Math.random() * pokemonsList.length);
    const pokemon = pokemonsList[randomIndex].pokemon.name;

    // Agora busca os dados detalhados do Pokémon (com sprite, por exemplo)
    const urlName = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    const responseName: any = await lastValueFrom(this.httpService.get(urlName));
    const pokemonData = responseName.data;

    const newPokemon = new this.pokemonModel({
      name: pokemonData.name,
      type: pokemonData.types[0]?.type?.name,
      image: pokemonData.sprites.front_default, // ou outra sprite
    });

    await newPokemon.save();

    return newPokemon;
    }   
    
    // vai até o banco de dados e busca todas as cidades
    async getAll() {
        return await this.pokemonModel.find().exec();
    }

    async getById(id: string) {
        const pokemon = await this.pokemonModel.findById(id).exec();
        if (! pokemon) {
            throw new NotFoundException(`Não foi possível encontrar o pokemon com id ${id}`)
        }
        return pokemon;
    }

    async create(pokemonDto: CreatePokemonDto) {
        console.log('Dados recebidos no DTO:', pokemonDto);
        const createdPokemon = new this.pokemonModel(pokemonDto);
        return await createdPokemon.save();
    }


    async update(id: string, pokemon: Pokemon) {
        await this.getById(id);
        const updatedPokemon = await this.pokemonModel.findByIdAndUpdate({_id: id}, pokemon).exec();
        if (! updatedPokemon) {
            throw new NotFoundException(`Não foi possível fazer o update da cidade com id ${id}`)
        }
        return updatedPokemon;
    }

    async delete(id: string) {
        return await this.pokemonModel.deleteOne({_id:id}).exec()
    }
    
}