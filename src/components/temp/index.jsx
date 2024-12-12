import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './styles.css';

const TemperatureDisplay = () => {
  const [temperatures, setTemperatures] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("TokenAccess");
    console.log("Token Temperatura: ", token);

    const fetchTemperatures = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/temperatura");
        setTemperatures(response.data);
        console.log(response.data[10]?.valor);
      } catch (err) {
        setError("Erro ao carregar os dados de temperatura.");
      }
    };

    fetchTemperatures();
  }, []);

  return (
    <div>
      <h1>Temperaturas Registradas</h1>
      {error && <p className="error">{error}</p>}
      <button className="back-button" onClick={() => navigate("/Dashboard")}>Voltar</button>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>SensorID</th>
              <th>Temperatura (°C)</th>
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
            {temperatures.map((data) => (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.valor.toFixed(2)}</td>
                <td>{new Date(data.timestamp).toLocaleString()}</td>
                <td>{data.sensor.id}</td>
                <td>null</td>
                <td>{data.sensor.unidade_medida}</td>
                <td>{data.sensor.latitude}</td>
                <td>{data.sensor.longitude}</td>
                <td>{data.sensor.localizacao}</td>
                <td>{data.sensor.responsavel}</td>
                <td>{String(data.sensor.status_operacional)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TemperatureDisplay;
