import { useState } from 'react';
import axios from 'axios';
import './App.css';

type Pokemon = {
  name: string;
  image: string;
  type: string;
};

type Response = {
  city: string;
  temp: number;
  weather: string;
  isRaining: boolean;
  type: string;
  pokemon: Pokemon;
};

type HistoryItem = {
  date: string;
  city: string;
  temp: number;
  weather: string;
  pokemon: string;
  type: string;
};

export default function App() {
  const [city, setCity] = useState('');
  const [response, setResponse] = useState<Response | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  async function getPokemonByCity() {
  try {
    const response = await axios.get(`http://localhost:3000/cities/pokemon/${city}`);

    setResponse(response.data);

    // Atualiza histórico, adicionando o novo resultado com data/hora atual
    setHistory(prev => [
      {
        date: new Date().toLocaleString(),
        city: response.data.city,
        temp: response.data.temp,
        weather: response.data.weather,
        pokemon: response.data.pokemon.name,
        type: response.data.pokemon.type,
      },
      ...prev,
    ]);
  } catch (error) {
    alert('Erro ao buscar os dados. Verifique a cidade e tente novamente.');
    console.error(error);
  }
}

  // Aqui você pode implementar o fetch para a API e atualizar resultado e historico

  return (
    <div className="container">
      <h1 className="titulo">Pokehunter</h1>

      <label htmlFor="cidadeInput">Digite uma cidade:</label>
      <div className="form-group">
        <input
          id="cidadeInput"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Exemplo: São Paulo"
        />
        <button type="button" onClick={getPokemonByCity}>Buscar</button>
      </div>

      {response && (
        <div className="resultado">
          <p><strong>Cidade:</strong> {response.city}</p>
          <p><strong>Temperatura:</strong> {response.temp}°C</p>
          <p><strong>Clima:</strong> {response.weather}</p>
          <p><strong>Está chovendo? </strong> {response.isRaining ? 'Sim ☔' : 'Não ☀️'} </p>
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
