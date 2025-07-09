export type Pokemon = {
  name: string
  type: string
  image: string
}

export type PokemonResponse = {
  city: string
  temp: number
  weather: string
  isRaining: boolean
  type: string
  pokemon: Pokemon
}

export type HistoryItem = {
  date: string
  city: string
  temp: number
  weather: string
  pokemon: string
  type: string
}

export type AuthFormProps = {
  onLogin: React.Dispatch<React.SetStateAction<string | null>>;
};

export type RegisterFormProps = {
  onRegister: (data: { username: string; name: string; email: string; password: string }) => void;
};

export type LoginFormProps = {
  onLogin: React.Dispatch<React.SetStateAction<string | null>>;
};