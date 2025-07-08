import { IsString, IsNotEmpty, IsUrl, IsNumber, IsMongoId } from 'class-validator';

export class CreatePokemonDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  temp: number;

  @IsString()
  @IsNotEmpty()
  weather: string;  // garante que seja uma URL válida

  @IsMongoId()
  @IsNotEmpty()
  pokemon: string;
}