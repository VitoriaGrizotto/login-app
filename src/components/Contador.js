import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Contador = () => {
  const [contadores, setContadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContadores = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/contador/');
        setContadores(response.data);
      } catch (error) {
        setError('Erro ao buscar contadores. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchContadores();
  }, []);

  if (loading) return <p>Carregando contadores...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Contadores</h2>
      <ul>
        {contadores.map((contador) => (
          <li key={contador.id}>
            <Link to={`/contador/${contador.id}`}>
              Contador - {new Date(contador.timestamp).toLocaleString()}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contador;
