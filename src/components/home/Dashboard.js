import React, { useState, useEffect } from "react";
import { Link, Navigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2'; // Importa o componente de gráfico de barras
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import './Dashboard.css'; // Estilos atualizados

// Registra os componentes do Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Dashboard = () => {
  const [token, setToken] = useState(localStorage.getItem("accessToken"));
  const [loggedInUser, setLoggedInUser] = useState("");
  const [redirectTo, setRedirectTo] = useState(null);

  useEffect(() => {
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("TokenAccess");
    console.log("Bastião: ", token);
    if (username) {
      setLoggedInUser(username);
    }
  }, []);

  const isLoggedIn = !!localStorage.getItem('TokenAccess');

  const handleSensorClick = (path) => {
    if (!isLoggedIn) {
      window.location.href = '/login';
    } else {
      setRedirectTo(path);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("TokenAccess");
    localStorage.removeItem("username");
    setRedirectTo('/login');
  };

  // Dados fictícios para o gráfico
  const data = {
    labels: ['Dia 1', 'Dia 2', 'Dia 3', 'Dia 4', 'Dia 5', 'Dia 6', 'Dia 7'],
    datasets: [
      {
        label: 'Temperatura (°C)',
        data: [22, 24, 21, 23, 25, 26, 22], // Temperaturas dos últimos 7 dias
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }
    ]
  };

  // Opções do gráfico
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Temperatura nos Últimos Dias',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  if (redirectTo) {
    return <Navigate to={redirectTo} />;
  }

  return (
    <div className="home-container">
      <header className="navbar">
        <h1 className="title">Smart City</h1>
        <nav className="nav-links">
          <button onClick={() => handleSensorClick('/temperatura')}>Temperatura</button>
          <button onClick={() => handleSensorClick('/umidade')}>Umidade</button>
          <button onClick={() => handleSensorClick('/contador')}>Contador</button>
          <button onClick={() => handleSensorClick('/luminosidade')}>Luminosidade</button>
        </nav>
      </header>
      <main>
        <h1>Bem-vindo(a) à Smart City!</h1>
        <p>Explore os sensores e veja os dados em tempo real.</p>

        <div className="sensor-info">
          <div className="sensor-section left">
            <p>O sensor de temperatura é essencial para monitorar variações térmicas e garantir a precisão em ambientes controlados.</p>
          </div>
          <div className="sensor-section right">
            <p>O sensor de umidade monitora o vapor d’água no ar, garantindo condições ideais em ambientes diversos.</p>
          </div>
          <div className="sensor-section left">
            <p>O contador ajuda a monitorar e registrar eventos, desde fluxo de pessoas até movimentação industrial.</p>
          </div>
          <div className="sensor-section right">
            <p>O sensor de luminosidade otimiza o uso de energia e melhora o conforto, adaptando a luz de acordo com a necessidade.</p>
          </div>
        </div>

        {/* Gráfico de barras */}
        <div className="chart-container">
          <h2>Temperatura nos Últimos Dias</h2>
          <Bar data={data} options={options} />
        </div>

      </main>
      <div className="logout-container">
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;
