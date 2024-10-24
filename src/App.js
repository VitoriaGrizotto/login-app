import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importa Routes em vez de Switch
import Login from './components/Login';
import Dashboard from './components/Dashboard'; // Importe seu componente de Dashboard ou outra página

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Tela de Login */}
        <Route path="/dashboard" element={<Dashboard />} /> {/* Rota do Dashboard */}
      </Routes>
    </Router>
  );
}

export default App;
