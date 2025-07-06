import * as mongoose from 'mongoose';

export const CitySchema = new mongoose.Schema({
    name: String,
    temp: Number,
    weather: String,
    tipoPokemon: String,
    pokemon: {
        id: String,
        nome: String,
    },
}, { timestamps: true });