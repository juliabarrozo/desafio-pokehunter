import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'
import { CitiesController } from './cities.controller';
import { CityService } from './shared/city.service';
import { CitySchema } from './schemas/city.schema';;
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonsModule } from 'src/pokemons/pokemons.module';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{name: 'City', schema: CitySchema }]),
    PokemonsModule
  ],
  controllers: [CitiesController],
  providers: [CityService]
})
export class CitiesModule {}
