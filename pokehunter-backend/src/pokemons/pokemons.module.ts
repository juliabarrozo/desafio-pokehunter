import { Module } from '@nestjs/common';
import { PokemonsController } from './pokemons.controller';
import { PokemonService } from './shared/pokemon.service';
import { PokemonSchema } from './schemas/pokemon.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Pokemon', schema: PokemonSchema }]),
    HttpModule
  ],
  controllers: [PokemonsController],
  providers: [PokemonService],
  exports: [PokemonService]
})
export class PokemonsModule {}
