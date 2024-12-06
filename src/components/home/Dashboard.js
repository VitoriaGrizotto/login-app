import React, { useState, useEffect } from "react";
import { Link, Navigate } from 'react-router-dom';
import './Dashboard.css'; // Estilos atualizados

// Importando as imagens
import arduino from "../images/arduino.png";
import temperaturaImg from "../images/temperatura.jpg";
import umidadeImg from "../images/umidade.png";
import contadorImg from "../images/contador.jpg";
import luminosidadeImg from "../images/luminosidade.jpg";

const Dashboard = () => {
  const [token, setToken] = useState(localStorage.getItem("accessToken"));
  const [loggedInUser, setLoggedInUser] = useState("");
  const [redirectToBlank, setRedirectToBlank] = useState(false); // Novo estado para redirecionamento

    useEffect(() => {
        // Recupera o nome do usuário logado do localStorage
        const username = localStorage.getItem("username");
        const token =localStorage.getItem("TokenAccess")
        console.log("Bastião: ", token)
        if (username) {
            setLoggedInUser(username);
        }
    }, []);
    const isLoggedIn = !!localStorage.getItem('TokenAccess');

    const handleSensorClick = () => {
      if (!isLoggedIn) {
          window.location.href = '/login';
      } else {
          setRedirectToBlank(true); // Define o estado para redirecionar
      }
  };

  if (redirectToBlank) {
      return <Navigate to="/blank" />; // Redireciona se o estado for true
  }


  return (
    <div className="home-container">
        <nav className="navbar">
            <div className="arduino">
                <img src={arduino} style={{ width: '100px', height: 'auto' }} alt="Arduino Logo" />
            </div>
            <ul className="nav-links">
                <li><Link to="/temperatura" onClick={handleSensorClick}>Temperatura</Link></li>
                <li><Link to="/umidade" onClick={handleSensorClick}>Umidade</Link></li>
                <li><Link to="/contador" onClick={handleSensorClick}>Contador</Link></li>
                <li><Link to="/luminosidade" onClick={handleSensorClick}>Luminosidade</Link></li>
            </ul>
            <div className="login-icon">
                <Link to={isLoggedIn ? "/" : "/login"}> {/* Redireciona para '/' se logado */}
                    {isLoggedIn ? "Logout" : "Login"} {/* Texto condicional para o link */}
                 </Link>
                <p>{loggedInUser}</p>
            </div>
        </nav>
        
            <h1>Bem-vindo à Home!</h1>
            <p>Você fez login com sucesso.</p>

            {/* Informações dos sensores com layout alternado */}
            <div className="sensor-info">
                <div className="sensor-section left">
                    <img src={temperaturaImg} alt="Sensor de Temperatura" />
                    <p>
                        O sensor de temperatura é um dispositivo fundamental em diversos ambientes, pois permite o monitoramento e registro das variações de temperatura em tempo real, garantindo que dados precisos estejam sempre disponíveis. Este tipo de sensor opera captando as mudanças térmicas e transformando-as em informações digitais, que são, então, transmitidas para sistemas de controle. Ele é amplamente utilizado em aplicações industriais, residenciais e comerciais para manter o ambiente em condições ideais, além de proteger equipamentos sensíveis ao calor. Em sistemas de climatização, por exemplo, o sensor de temperatura é essencial para ajustar automaticamente a refrigeração ou o aquecimento, assegurando a eficiência energética e o conforto dos ocupantes. Em ambientes laboratoriais, a precisão do sensor é crucial para a realização de experimentos sensíveis que dependem de condições térmicas específicas. Por meio de análises gráficas, ele possibilita a avaliação de tendências de temperatura ao longo do tempo, sendo um grande aliado na prevenção de problemas e na tomada de decisões informadas sobre manutenção e ajustes técnicos.</p>
                </div>
                <div className="sensor-section right">
                    <p>O sensor de umidade é essencial para monitorar a quantidade de vapor d’água no ar, o que é especialmente importante em ambientes como estufas, armazéns, indústrias e até residências. Esse dispositivo mede a umidade relativa, oferecendo informações em tempo real que ajudam a manter as condições ideais em um espaço. Em sistemas de climatização, o sensor permite ajustes automáticos para preservar o conforto térmico. Além disso, em ambientes industriais, ele auxilia na proteção de equipamentos sensíveis e evita a deterioração de materiais. O monitoramento contínuo da umidade é vital para manter a integridade dos processos e garantir ambientes saudáveis e seguros.</p>
                    <img src={umidadeImg} alt="Sensor de Umidade" />
                </div>
                <div className="sensor-section left">
                    <img src={contadorImg} alt="Sensor Contador" />
                    <p>O contador é um dispositivo crucial utilizado para monitorar e registrar a frequência de eventos ou a presença de pessoas em uma área específica. Ele pode ser empregado em diversos contextos, como em lojas de varejo, onde é usado para contabilizar o número de clientes que entram e saem, ajudando a avaliar o fluxo de clientes e otimizar o atendimento. Em eventos, como concertos ou conferências, o contador permite verificar a quantidade de participantes, garantindo a segurança e o cumprimento das normas de capacidade. Além disso, em ambientes industriais, ele pode ser usado para monitorar a movimentação de trabalhadores e equipamentos, contribuindo para a segurança e eficiência operacional. A tecnologia utilizada varia, podendo incluir sensores infravermelhos, câmeras ou contadores de pressão, dependendo da aplicação. Os dados coletados são frequentemente integrados a sistemas de análise, permitindo a tomada de decisões mais informadas e estratégias de melhoria contínua. O contador não apenas ajuda na gestão de espaços, mas também na análise de tendências, fornecendo insights valiosos para o planejamento futuro.</p>
                </div>
                <div className="sensor-section right">
                    <p>O sensor de luminosidade é um dispositivo projetado para medir a intensidade da luz em um ambiente específico. Ele é amplamente utilizado em diversas aplicações, desde residências até indústrias, desempenhando um papel crucial na automação e no controle ambiental. Esses sensores funcionam detectando a luz natural ou artificial e convertendo essa informação em sinais elétricos que podem ser interpretados por sistemas eletrônicos.

                        Um dos principais benefícios do sensor de luminosidade é sua capacidade de otimizar o uso de energia. Por exemplo, em ambientes comerciais, ele pode regular a intensidade das luzes artificiais com base na luminosidade natural disponível, contribuindo para a redução do consumo de energia e custos operacionais. Em casas inteligentes, esses sensores podem ativar ou desativar luzes automaticamente, melhorando o conforto e a conveniência para os moradores.

                        Além disso, o sensor de luminosidade é fundamental em sistemas de segurança, onde a detecção de mudanças nos níveis de luz pode indicar a presença de intrusos. Em ambientes agrícolas, eles ajudam a monitorar as condições de cultivo, garantindo que as plantas recebam a quantidade ideal de luz para um crescimento saudável.

                        Ao coletar e analisar dados sobre a intensidade da luz, os sensores de luminosidade não apenas melhoram a eficiência energética, mas também proporcionam um ambiente mais confortável e seguro para os usuários.</p>
                    <img src={luminosidadeImg} alt="Sensor de Luminosidade" />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
