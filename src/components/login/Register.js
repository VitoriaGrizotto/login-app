import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './login.css'; // Usando o mesmo CSS

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/register/', { 
        username, 
        password 
      });
      setSuccess('Cadastro realizado com sucesso!');
      setError('');
      setTimeout(() => navigate("/"), 2000); // Redireciona para login após sucesso
    } catch (err) {
      setError('Erro ao cadastrar. Verifique os dados.');
      setSuccess('');
    }
  };

  return (
    <div className="form-container">
      <h2>Cadastro</h2>
      <form onSubmit={handleRegister} className="form">
        <div>
          <label>Usuário:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
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
        <button type="submit">Cadastrar</button>
      </form>
      {success && <p className="success-message">{success}</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="toggle-link" onClick={() => navigate("/")}>
        Já tem uma conta? Faça login
      </div>
    </div>
  );
};

export default Register;
