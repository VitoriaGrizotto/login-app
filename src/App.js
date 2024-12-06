import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/login/Register';
import Dashboard from './components/home/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Temp from './components/temp';

import Luminosidade from './components/lumi/luminosidade';
import Umidade from './components/umi/umidade';
import Contador from './components/cont/contador';


const BodyClassHandler = () => {
  const location = useLocation();

  useEffect(() => {
    const body = document.body;

    // Define classes diferentes para rotas específicas
    if (location.pathname === '/login' || location.pathname === '/register') {
      body.classList.add('login-page');
    } else {
      body.classList.remove('login-page');
    }
  }, [location]);

  return null; // Não renderiza nada, só ajusta o body
};

const App = () => {
  return (
    <Router>
      <BodyClassHandler /> {/* Componente que gerencia as classes do body */}
      <Routes>
        <Route path="/" element={<Login />} /> {/* Rota principal para login */}
        <Route path="/login" element={<Login />} /> {/* Rota alternativa para login */}
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/temperatura" element={<Temp />} />
        <Route path="/umidade" element={<Umidade />} />
        <Route path="/contador" element={<Contador />} />
        <Route path="/luminosidade" element={<Luminosidade />} />
      </Routes>
    </Router>
  );
};

export default App;
