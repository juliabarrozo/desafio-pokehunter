import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import RegisterForm from './RegisterForm'

describe('RegisterForm', () => {
  it('renders all inputs and button', () => {
    render(<RegisterForm onRegister={vi.fn()} />)

    expect(screen.getByPlaceholderText(/nome de usuário/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/nome/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/senha/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /cadastrar/i })).toBeInTheDocument()
  })

  it('submits form with correct values', async () => {
    const mockRegister = vi.fn()
    render(<RegisterForm onRegister={mockRegister} />)

    fireEvent.change(screen.getByPlaceholderText(/nome de usuário/i), {
      target: { value: 'juliabar' }
    })
    fireEvent.change(screen.getByPlaceholderText(/nome/i), {
      target: { value: 'Júlia' }
    })
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'julia@email.com' }
    })
    fireEvent.change(screen.getByPlaceholderText(/senha/i), {
      target: { value: 'senha123' }
    })

    fireEvent.click(screen.getByRole('button', { name: /cadastrar/i }))

    // aguarda qualquer efeito assíncrono se houver
    await new Promise(r => setTimeout(r, 100))

    expect(mockRegister).toHaveBeenCalled()
  })
})
