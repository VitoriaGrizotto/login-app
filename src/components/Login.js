import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  // Definindo os estados para o usuário, senha e mensagens de erro
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Função chamada quando o formulário de login for enviado
  const handleSubmit = async (e) => {
    e.preventDefault();  // Evita o comportamento padrão de recarregar a página

    try {
      // Faz a requisição POST para a API com os dados de login
      const response = await axios.post(
        'http://localhost:8000/api/token/',
        { username: usuario, 
          password: password
        }, // Enviando 'usuario' em vez de 'email'
      
      );

      // Verifica se o login foi bem-sucedido (assumindo que a resposta inclui um token)
      if (response.data.access) {
        // Armazena o token no localStorage para uso futuro
        localStorage.setItem('TokenAccess', response.data.access);

        // Redireciona o usuário para outra página após o login
        window.location.href = '/dashboard';  // Altere para a rota que faz sentido no seu app
      } else {
        // Mensagem de erro se não houver token na resposta
        setError('Erro de autenticação: token não recebido.');
      }
    } catch (error) {
      // Define a mensagem de erro caso o login falhe
      if (error.response && error.response.status === 401) {
        setError('Login falhou: credenciais incorretas.');
      } else {
        setError('Erro ao conectar-se à API. Tente novamente.');
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {/* Formulário de login */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuário:</label>
          <input 
            type="text"  // Mudando o tipo para texto
            value={usuario}  // Atualizando para o estado 'usuario'
            onChange={(e) => setUsuario(e.target.value)}
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
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;
