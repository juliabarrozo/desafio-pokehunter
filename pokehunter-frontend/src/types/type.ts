export type Pokemon = {
  name: string
  type: string
  image: string
}

export type PokemonResponse = {
  city: string
  temp: number
  weather: string
  isRaining: boolean
  type: string
  pokemon: Pokemon
}

export type HistoryItem = {
  date: string
  city: string
  temp: number
  weather: string
  pokemon: string
  type: string
}
