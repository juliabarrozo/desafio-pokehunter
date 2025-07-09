# Pokehunter
## Definição
Pokehunter é uma aplicação que retorna um pokemon a partir das condições climáticas de uma cidade.

## Funcionalidades
- Busca por cidade;
- Card com nome da cidade, temperatura, clima, se está chovendo, nome do pokemon, tipo e imagem;
- Histórico que armazena os dados da última requisição com a data e a hora.

## Regras de negócio
O sistema consulta as condições climáticas da cidade por uma API externa, em seguida determina condições de tempo e temperatura que retornaram determinados tipos de pokemons. Então, ele realiza a consulta os pokemons existentes daquele tipo, seleciona um pokemon aleatório e salva os dados no banco de dados.
- Se o clima for de chuva ou tempestade → Pokemon do tipo elétrico 
- Se a temperatura < 5°C → Pokémon do tipo gelo
- Entre 5°C e 10°C → água
- Entre 12°C e 15°C → grama
- Entre 15°C e 21°C → terra
- Entre 23°C e 27°C → inseto
- Entre 27°C e 33°C → pedra
- Acima de 33°C → fogo


## Tecnologias utilizadas
- Frontend: Reactjs
- Backend: Nestjs
- Banco de dados: MongoDB
- Ambiente Deploy: Docker compose
- Teste: Jest
- Gerenciamento de dependências: npm
- APIs externas: OpenWeatherMap (Current Weather Data) e PokeAPI

## Testes
Cobertura de testes com Vitest no frontend e Jest no backend
Testes unitários em:
Formulário de busca
Renderização de componentes
Lógica de consumo de API
Requisições HTTP simuladas

## Autenticação
Usuários precisam fazer login para acessar a funcionalidades de get, post, create e delete das cidades e dos pokemons
Cadastro com username, nome, e-mail e senha (senha difícil)
Autenticação JWT
Token com validade de 1 hora

## Estrutura de pastas
- pokehunter-frontend/ → Interface em React
- components/ → Componentes reutilizáveis
- types/ → Tipagens TypeScript
- App.tsx → Lógica principal
- pokehunter-backend/ → API NestJS
- modules/ → Users, Cities, Pokémon
- services/ → Integrações e lógica
- schemas/ → MongoDB com Mongoose

## Pré requisitos para rodar o projeto localmente
Instalação do docker desktop

## Como rodar o projeto
- Clone o respositório local no prompt de comando: git clone link_repositorio
- Crie os diretórios data/mongo: mkdir -p data/mongo
- Crie um arquivo .env com essas informações:
MONGODB_USER=pokehunter_user
MONGODB_PASSWORD=your_secure_password 
- Inicie o serviço de cópia das imagens da aplicação: docker compose up --build -d

Backend/api: http://localhost:3000 | Frontend: http://localhost:80


