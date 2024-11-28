import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Luminosidade = () => {
  const [luminosidades, setLuminosidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLuminosidades = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/luminosidade/');
        setLuminosidades(response.data);
      } catch (error) {
        setError('Erro ao buscar luminosidade. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchLuminosidades();
  }, []);

  if (loading) return <p>Carregando luminosidades...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Luminosidades</h2>
      <ul>
        {luminosidades.map((luminosidade) => (
          <li key={luminosidade.id}>
            <Link to={`/luminosidade/${luminosidade.id}`}>
              {luminosidade.valor} Lux - {new Date(luminosidade.timestamp).toLocaleString()}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Luminosidade;
