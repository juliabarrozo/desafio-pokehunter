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

  it('atualiza o input corretamente', () => {
    render(<SearchForm setResult={mockSetResult} setHistory={mockSetHistory} />)

    const input = screen.getByPlaceholderText(/digite a cidade/i)
    fireEvent.change(input, { target: { value: 'Brasília' } })

    expect(input).toHaveValue('Brasília')
  })

  it('chama a API e atualiza estados', async () => {
    const fakeData: PokemonResponse = {
    city: 'Brasília',
    temp: 35,
    weather: 'Ensolarado',
    isRaining: false,          // essa propriedade é obrigatória
    type: 'fogo',
    pokemon: {
        name: 'Charmander',
        type: 'fogo',
        image: 'https://img.com/charmander.png',
    },
    }

    mockedAxios.get.mockResolvedValueOnce({ data: fakeData })

    render(<SearchForm setResult={mockSetResult} setHistory={mockSetHistory} />)

    const input = screen.getByPlaceholderText(/digite a cidade/i)
    fireEvent.change(input, { target: { value: 'Brasília' } })

    const button = screen.getByRole('button', { name: /buscar pokémon/i })
    fireEvent.click(button)

    await waitFor(() => {
      expect(mockSetResult).toHaveBeenCalledWith(fakeData)
      expect(mockSetHistory).toHaveBeenCalled()
    })
  })
})
