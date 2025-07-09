import { useState } from 'react';
import axios from 'axios';
import AuthForm from './components/AuthForm/AuthForm'; // componente de login/cadastro
import type { HistoryItem, PokemonResponse } from './types/type';
import './App.css';

export default function App() {
  const [token, setToken] = useState<string | null>(null);
  const [city, setCity] = useState('');
  const [response, setResponse] = useState<PokemonResponse | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  async function getPokemonByCity() {
    if (!token) {
      alert('Faça login primeiro');
      return;
    }

    try {
      const res = await axios.get(`http://localhost:3000/cities/pokemon/${city}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setResponse(res.data);

      setHistory(prev => [
        {
          date: new Date().toLocaleString(),
          city: res.data.city,
          temp: res.data.temp,
          weather: res.data.weather,
          pokemon: res.data.pokemon.name,
          type: res.data.pokemon.type,
        },
        ...prev,
      ]);
    } catch (error) {
      alert('Erro ao buscar os dados. Verifique a cidade e tente novamente.');
      console.error(error);
    }
  }

  if (!token) {
    return <AuthForm onLogin={setToken} />;
  }

  return (
    <div className="container">
      <h1 className="titulo">Pokehunter</h1>

      <label htmlFor="cidadeInput">Digite uma cidade:</label>
      <div className="form-group">
        <input
          id="cidadeInput"
          type="text"
          value={city}
          onChange={e => setCity(e.target.value)}
          placeholder="Exemplo: São Paulo"
        />
        <button type="button" onClick={getPokemonByCity}>
          Buscar
        </button>
      </div>

      {response && (
        <div className="resultado">
          <p><strong>Cidade:</strong> {response.city}</p>
          <p><strong>Temperatura:</strong> {response.temp}°C</p>
          <p><strong>Clima:</strong> {response.weather}</p>
          <p><strong>Está chovendo? </strong> {response.isRaining ? 'Sim ☔' : 'Não ☀️'}</p>
          <p><strong>Tipo do Pokémon:</strong> {response.pokemon.type}</p>
          <div className="pokemon-box">
            <img src={response.pokemon.image} alt={response.pokemon.name} />
            <p className="nome-pokemon">{response.pokemon.name}</p>
          </div>
        </div>
      )}

      {history.length > 0 && (
        <div className="history">
          <h2>Histórico</h2>
          <table>
            <thead>
              <tr>
                <th>Data</th>
                <th>Cidade</th>
                <th>Temp</th>
                <th>Clima</th>
                <th>Pokémon</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, index) => (
                <tr key={index}>
                  <td>{item.date}</td>
                  <td>{item.city}</td>
                  <td>{item.temp}°C</td>
                  <td>{item.weather}</td>
                  <td>{item.pokemon}</td>
                  <td>{item.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
