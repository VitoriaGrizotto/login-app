import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Umidade = () => {
  const [umidades, setUmidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUmidades = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/umidade/');
        setUmidades(response.data);
      } catch (error) {
        setError('Erro ao buscar umidades. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchUmidades();
  }, []);

  if (loading) return <p>Carregando umidades...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Umidades</h2>
      <ul>
        {umidades.map((umidade) => (
          <li key={umidade.id}>
            <Link to={`/umidade/${umidade.id}`}>
              {umidade.valor}% - {new Date(umidade.timestamp).toLocaleString()}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Umidade;
