import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokemonsModule } from './pokemons/pokemons.module';
import { CitiesModule } from './cities/cities.module';
import { PokemonService } from './pokemons/shared/pokemon.service';
import { CityService } from './cities/shared/city.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://db_user:69t5Fe3C3xgOmBYX@cluster0.lvem9lq.mongodb.net/pokehunter?retryWrites=true&w=majority&appName=Cluster0'),
    PokemonsModule, 
    CitiesModule,
    UsersModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
