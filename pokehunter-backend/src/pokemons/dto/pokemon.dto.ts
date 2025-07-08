import { IsString, IsNotEmpty, IsUrl, IsMongoId } from 'class-validator';

export class CreatePokemonDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  image: string;  // garante que seja uma URL válida

  @IsMongoId()
  @IsNotEmpty()
  city: string;
}
