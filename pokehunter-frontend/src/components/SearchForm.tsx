import { useState } from 'react'
import axios from 'axios'

// Tipos usados no componente
type Pokemon = {
  name: string
  image: string
}

type PokemonResponse = {
  city: string
  temp: number
  weather: string
  type: string
  pokemon: Pokemon
}

type HistoryItem = {
  date: string
  city: string
  temp: number
  type: string
  pokemon: Pokemon
}

type Props = {
  setResult: (r: PokemonResponse) => void
  setHistory: React.Dispatch<React.SetStateAction<HistoryItem[]>>
}

function SearchForm({ setResult, setHistory }: Props) {
  const [city, setCity] = useState('')

  const handleSearch = async () => {
    try {
      const res = await axios.get<PokemonResponse>(`http://localhost:3000/pokemon/${city}`)

      setResult(res.data)

      setHistory(prev => [
        ...prev,
        {
          date: new Date().toISOString(),
          city: res.data.city,
          temp: res.data.temp,
          type: res.data.type,
          pokemon: res.data.pokemon,
        },
      ])
    } catch (err) {
      alert('Erro ao buscar dados')
    }
  }

  return (
    <div>
      <input
        value={city}
        onChange={e => setCity(e.target.value)}
        placeholder="Digite a cidade"
      />
      <button onClick={handleSearch}>Buscar Pokémon</button>
    </div>
  )
}

export default SearchForm
