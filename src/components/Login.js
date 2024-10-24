import React, { useState } from 'react';
import axios from 'axios';  // Importa o Axios para fazer as requisições à API

const Login = () => {
  // Definindo os estados para o e-mail, senha e mensagens de erro
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Função chamada quando o formulário de login for enviado
  const handleSubmit = async (e) => {
    e.preventDefault();  // Evita o comportamento padrão de recarregar a página

    try {
      // Faz a requisição POST para a API com os dados de login
      const response = await axios.post('http://localhost:8000/api/login', { email, password });

      // Verifica se o login foi bem-sucedido (assumindo que a resposta inclui um token)
      if (response.data.token) {
        // Armazena o token no localStorage para uso futuro
        localStorage.setItem('authToken', response.data.token);

        // Redireciona o usuário para outra página após o login
        window.location.href = '/dashboard';  // Altere para a rota que faz sentido no seu app
      }
    } catch (error) {
      // Define a mensagem de erro caso o login falhe
      setError('Login falhou. Verifique suas credenciais.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {/* Formulário de login */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha:</label>
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Entrar</button>
      </form>

      {/* Exibe uma mensagem de erro se o login falhar */}
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
