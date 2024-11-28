import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Luminosidade from './components/Luminosidade';
import Umidade from './components/Umidade';
import Contador from './components/Contador';
import ProtectedRoute from './components/ProtectedRoute';
import Temp from "./components/temp"


const App = () => {
  return (
    <Router>
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

