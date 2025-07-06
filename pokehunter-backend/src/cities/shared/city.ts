import { Document } from 'mongoose';

export class City extends Document {
    name: string;
    temp: number;
    weather: string;
    tipoPokemon: string;
    pokemon: {
        id: string;
        name: string;
    };
    createdAt: Date;  
    updatedAt: Date;  
}

