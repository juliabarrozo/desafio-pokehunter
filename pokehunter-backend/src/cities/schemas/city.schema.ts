import * as mongoose from 'mongoose';

export const CitySchema = new mongoose.Schema({
    name: String,
    temp: Number,
    weather: String,
    tipoPokemon: String,
    pokemon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pokemon',  // referenciando pelo ID
  },
}, { timestamps: true });