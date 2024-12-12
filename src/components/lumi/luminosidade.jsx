import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './styles.css';

const LuminosidadeDisplay = () => {
  const [luminosidade, setLuminosidade] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook para navegação

  useEffect(() => {
    const fetchLuminosidade = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/luminosidade/");
        setLuminosidade(response.data);
        console.log(response.data);
      } catch (err) {
        setError("Erro ao carregar os dados de luminosidade.");
      }
    };

    fetchLuminosidade();
  }, []);

  return (
    <div>
      <h1>Luminosidade Registrada</h1>
      {error && <p className="error">{error}</p>}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>ID do Sensor</th>
              <th>Data de Registro</th>
              <th>Tipo</th>
              <th>Unid</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Localização</th>
              <th>Responsável</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {luminosidade.map((luminosidade_sensor) => (
              <tr key={luminosidade_sensor.id}>
                <td>{luminosidade_sensor.id}</td>
                <td>{new Date(luminosidade_sensor.timestamp).toLocaleString()}</td>
                <td>null</td>
                <td>null</td>
                <td>null</td>
                <td>null</td>
                <td>null</td>
                <td>null</td>
                <td>{String(luminosidade_sensor.status_operacional)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="back-button" onClick={() => navigate(-1)}>Voltar</button>
    </div>
  );
};

export default LuminosidadeDisplay;
