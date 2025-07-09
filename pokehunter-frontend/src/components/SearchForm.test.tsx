import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import axios from 'axios'
import SearchForm from './SearchForm'
import type { PokemonResponse } from '../types/type'

vi.mock('axios')
const mockedAxios = axios as unknown as { get: any }

describe('SearchForm', () => {
  const mockSetResult = vi.fn()
  const mockSetHistory = vi.fn()

  it('updates the input correctly', () => {
    render(<SearchForm setResult={mockSetResult} setHistory={mockSetHistory} />)

    const input = screen.getByPlaceholderText(/digite a cidade/i)
    fireEvent.change(input, { target: { value: 'Brasília' } })

    expect(input).toHaveValue('Brasília')
  })

  it('calls the API and updates states', async () => {
    const mockData: PokemonResponse = {
    city: 'Brasília',
    temp: 35,
    weather: 'Ensolarado',
    isRaining: false,          
    type: 'fogo',
    pokemon: {
        name: 'Charmander',
        type: 'fogo',
        image: 'https://img.com/charmander.png',
    },
    }

    mockedAxios.get.mockResolvedValueOnce({ data: mockData })

    render(<SearchForm setResult={mockSetResult} setHistory={mockSetHistory} />)

    const input = screen.getByPlaceholderText(/digite a cidade/i)
    fireEvent.change(input, { target: { value: 'Brasília' } })

    const button = screen.getByRole('button', { name: /buscar pokémon/i })
    fireEvent.click(button)

    await waitFor(() => {
      expect(mockSetResult).toHaveBeenCalledWith(mockData)
      expect(mockSetHistory).toHaveBeenCalled()
    })
  })
})
