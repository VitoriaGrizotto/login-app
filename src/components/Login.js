import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './login.css'; // Importando o CSS

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/token/', { username: usuario, password: password });

      if (response.data.access) {
        localStorage.setItem('TokenAccess', response.data.access);
        navigate("/dashboard"); // Redireciona para o Dashboard após login
      } else {
        setError('Erro de autenticação: token não recebido.');
      }
    } catch (error) {
      setError('Erro ao conectar-se à API. Tente novamente.');
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="form">
        <div>
          <label>Usuário:</label>
          <input type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} required />
        </div>
        <div>
          <label>Senha:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Entrar</button>
      </form>
      {error && <p className="error-message">{error}</p>}

      <div className="toggle-link" onClick={() => navigate("/register")}>
        Não tem uma conta? Cadastre-se
      </div>
    </div>
  );
};

export default Login;
