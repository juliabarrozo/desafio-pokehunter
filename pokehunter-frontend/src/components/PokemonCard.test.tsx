import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import PokemonCard from './PokemonCard'
import type { PokemonResponse } from '../types/type'

const mockData: PokemonResponse = {
  city: 'São Paulo',
  temp: 22,
  weather: 'Chuvoso',
  isRaining: true,
  type: 'água',
  pokemon: {
    name: 'Squirtle',
    type: 'água',
    image: 'https://img.com/squirtle.png',
  },
}

describe('PokemonCard', () => {
  it('should render the Pokémon information correctly', () => {
    render(<PokemonCard data={mockData} />)

    expect(screen.getByText('Squirtle')).toBeInTheDocument()
    expect(screen.getByText(/Tipo: água/i)).toBeInTheDocument()
    expect(screen.getByAltText('Squirtle')).toHaveAttribute('src', mockData.pokemon.image)
    expect(screen.getByText(/Cidade: São Paulo/i)).toBeInTheDocument()
    expect(screen.getByText(/Temp: 22°C/i)).toBeInTheDocument()
    expect(screen.getByText(/Clima: Chuvoso/i)).toBeInTheDocument()
  })
})
