import type { PokemonResponse } from "../types/type"

type Props = {
  data: PokemonResponse
}

function PokemonCard({ data }: Props) {
  return (
    <div>
      <h2>{data.pokemon.name}</h2>
      <p>Tipo: {data.type}</p>
      <img src={data.pokemon.image} alt={data.pokemon.name} />
      <p>Cidade: {data.city} | Temp: {data.temp}°C | Clima: {data.weather}</p>
    </div>
  )
}

export default PokemonCard
