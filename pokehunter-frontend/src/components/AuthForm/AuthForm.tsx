import type { AuthFormProps } from '../../types/type';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import './AuthForm.css';

export default function AuthForm({ onLogin }: AuthFormProps) {

  function handleRegister(userData: any) {
    console.log('Usuário registrado:', userData);
  }

  return (
    <div>
      <h1 className="auth-title">Pokehunter</h1>
      <div className="auth-container">
        <LoginForm onLogin={onLogin} />
        <RegisterForm onRegister={handleRegister} />
      </div>
    </div>
  );
}
