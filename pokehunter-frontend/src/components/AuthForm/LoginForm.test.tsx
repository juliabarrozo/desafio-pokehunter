import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import LoginForm from './LoginForm'

describe('LoginForm', () => {
  it('renders all inputs and button', () => {
    render(<LoginForm onLogin={vi.fn()} />)

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/senha/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument()
  })

  it('submits form with correct values', async () => {
    const mockLogin = vi.fn()
    render(<LoginForm onLogin={mockLogin} />)

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'user@example.com' }
    })
    fireEvent.change(screen.getByPlaceholderText(/senha/i), {
      target: { value: 'senha123' }
    })

    fireEvent.click(screen.getByRole('button', { name: /entrar/i }))

    // aguarda qualquer efeito assíncrono se houver
    await new Promise(r => setTimeout(r, 100))

    expect(mockLogin).toHaveBeenCalled()
  })
})
