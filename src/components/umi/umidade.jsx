import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './styles.css';
 
const UmidadeDisplay = () => {
  const [umidade, setUmidade] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook para navegação
 
  useEffect(() => {
    const fetchUmidade = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/umidade/");
        setUmidade(response.data);
        console.log(response.data);
      } catch (err) {
        setError("Erro ao carregar os dados de umidade.");
      }
    };
 
    fetchUmidade();
  }, []);
 
  return (
    <div>
      <h1>Umidades Registradas</h1>
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
            {umidade.map((umi_sensor) => (
              <tr key={umi_sensor.id}>
                <td>{umi_sensor.id}</td>
                <td>{new Date(umi_sensor.timestamp).toLocaleString()}</td>
                <td>null</td>
                <td>null</td>
                <td>null</td>
                <td>null</td>
                <td>null</td>
                <td>null</td>
                <td>{String(umi_sensor.status_operacional)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="back-button" onClick={() => navigate(-1)}>Voltar</button>
    </div>
  );
};
 
export default UmidadeDisplay;
