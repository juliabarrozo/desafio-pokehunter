import React, { useState } from 'react';
import type { RegisterFormProps } from '../../types/type';

export default function RegisterForm({ onRegister }: RegisterFormProps) {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  try {
    const res = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, name, email, password }),
    });

    if (!res.ok) {
      alert('Falha no cadastro');
      return;
    }

    alert('Cadastro realizado com sucesso! Por favor, faça login.');

    setUsername('');
    setName('');
    setEmail('');
    setPassword('');

    // Chama o onRegister para avisar o pai que deu certo
    if(onRegister) {
      onRegister({ username, name, email, password });
    }

  } catch (error) {
    alert('Erro ao tentar cadastrar');
    console.error(error);
  }
}


  return (
    <div className="auth-box">
      <form onSubmit={handleSubmit}>
        <h2>Cadastro</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}
