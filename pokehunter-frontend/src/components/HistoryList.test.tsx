import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import HistoryList from './HistoryList'
import type { HistoryItem } from '../types/type'

const historyMock: HistoryItem[] = [
  {
    date: '2025-07-07T15:30:00',
    city: 'Belo Horizonte',
    temp: 28,
    weather: 'Ensolarado',
    pokemon: 'Onix',
    type: 'pedra',
  },
]

describe('HistoryList', () => {
  it('deve renderizar o histórico corretamente', () => {
    render(<HistoryList history={historyMock} />)

    // Verifica se o texto do primeiro item do histórico aparece na tela
    expect(screen.getByText(/2025-07-07 - Belo Horizonte - 28°C - Onix \(pedra\)/i)).toBeInTheDocument()
  })
})
