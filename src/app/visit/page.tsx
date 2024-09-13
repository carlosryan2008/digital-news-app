"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import MuseumMap from '@/components/MuseumMap';

export default function Visit() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    data: '',
    quantidade: '',
    horario: '',
  });

  const [total, setTotal] = useState(0);
  const precoTicket = 30;
  const [pagamentoSimulado, setPagamentoSimulado] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { src: "/assets/img/post-slide-5.jpg", caption: "Museu Histórico Jacinto de Sousa - Fachada" },
    { src: "/assets/img/post-slide-6.jpg", caption: "Acervo do Museu" },
    { src: "/assets/img/post-slide-7.jpg", caption: "Sala de Exposições" },
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000); // Alterne os slides a cada 3 segundos

    return () => clearInterval(slideInterval);
  }, [slides.length]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'quantidade') {
      setTotal(Number(e.target.value) * precoTicket);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { nome, email, data, quantidade, horario } = formData;

    if (!nome || !email || !data || !quantidade || !horario) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const dataSelecionada = new Date(data);
    const hoje = new Date();
    const diaSemana = dataSelecionada.getDay();

    if (dataSelecionada < hoje || diaSemana === 1) {
      alert("A data selecionada deve ser posterior a hoje e não pode ser uma segunda-feira.");
      return;
    }

    setPagamentoSimulado(true);

    const mensagem = `\
      Olá, gostaria de confirmar o agendamento de visita ao Museu Histórico Jacinto de Sousa.
      \nNome: ${nome}
      \nE-mail: ${email}
      \nData: ${data}
      \nHorário: ${horario}
      \nQuantidade de Tickets: ${quantidade}
      \nTotal: R$ ${total}
    `;

    window.open(`https://wa.me/5581999999999?text=${encodeURIComponent(mensagem)}`, '_blank');
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="container">
      <h1>Agendamento de Visita ao Museu Histórico Jacinto de Sousa</h1>
      <p>
        O Museu Histórico Jacinto de Sousa, localizado em Quixadá, Ceará, é um espaço dedicado à preservação e valorização da memória cultural do município. Durante sua visita, você poderá:
      </p>
      <ul>
        <li>Explorar a história local e conhecer mais sobre a cultura de Quixadá através do acervo do museu.</li>
        <li>Admiração da Arquitetura ao observar a estrutura do museu e sua importância histórica.</li>
        <li>Apreciar o Acervo com exposições de utensílios domésticos, mobiliários, arte sacra, fotografias, documentos e outros artefatos.</li>
        <li>Enriquecer sua compreensão sobre a vida cotidiana e a produção cultural da região.</li>
        <li>Utilizar o museu como um recurso educacional para uma melhor compreensão da história e cultura de Quixadá.</li>
      </ul>

      {/* Carrossel de Slides */}
      <div className="carousel">
        <div className="carousel-slides" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {slides.map((slide, index) => (
            <div key={index} className="carousel-slide">
              <Image src={slide.src} alt={`Museu Histórico Jacinto de Sousa ${index + 1}`} layout="fill" objectFit="cover" />
              <div className="carousel-caption">{slide.caption}</div>
            </div>
          ))}
        </div>
        <button className="carousel-button prev" onClick={handlePrevSlide}>❮</button>
        <button className="carousel-button next" onClick={handleNextSlide}>❯</button>
      </div>

      {/* Formulário de agendamento */}
      <div className="form-container">
        <h2>Agende Sua Visita</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="nome">Nome Completo:</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="data">Data da Visita:</label>
            <input
              type="date"
              id="data"
              name="data"
              value={formData.data}
              onChange={handleChange}
              required
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div className="form-group">
            <label htmlFor="horario">Horário de Visita:</label>
            <select
              id="horario"
              name="horario"
              value={formData.horario}
              onChange={handleChange}
              required
            >
              <option value="">Selecione o horário desejado</option>
              <option value="08:00">08:00</option>
              <option value="09:00">09:00</option>
              <option value="10:00">10:00</option>
              <option value="11:00">11:00</option>
              <option value="13:00">13:00</option>
              <option value="14:00">14:00</option>
              <option value="15:00">15:00</option>
              <option value="16:00">16:00</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="quantidade">Quantidade de Tickets:</label>
            <select
              id="quantidade"
              name="quantidade"
              value={formData.quantidade}
              onChange={handleChange}
              required
            >
              <option value="">Selecione a quantidade desejada</option>
              <option value="1">1 Ticket</option>
              <option value="2">2 Tickets</option>
              <option value="3">3 Tickets</option>
              <option value="4">4 Tickets</option>
              <option value="5">5 Tickets</option>
            </select>
          </div>
          <div className="form-group">
            <p>Total: <strong>R$ {total}</strong></p>
          </div>

          {!pagamentoSimulado ? (
            <button type="submit" className="pay-btn">
              Pagar
            </button>
          ) : (
            <p className="success-message">Fale com nossos atendentes para concluir seu agendamento.</p>
          )}
        </form>
      </div>

      {/* Adicionando o mapa */}
      <div className="map-container">
        <h2>Localização dos Museus</h2>
        <MuseumMap />
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .container {
          animation: fadeIn 2s ease-in-out;
          max-width: 800px;
          margin: auto;
          padding: 20px;
        }
        .carousel {
          position: relative;
          overflow: hidden;
          margin-bottom: 20px;
        }
        .carousel-slides {
          display: flex;
          transition: transform 0.5s ease;
        }
        .carousel-slide {
          min-width: 100%;
          position: relative;
        }
        .carousel-caption {
          position: absolute;
          bottom: 10px;
          left: 10px;
          background-color: rgba(0, 0, 0, 0.5);
          color: white;
          padding: 5px;
          border-radius: 3px;
        }
        .carousel-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background-color: rgba(0, 0, 0, 0.5);
          color: white;
          border: none;
          padding: 10px;
          cursor: pointer;
        }
        .prev {
          left: 10px;
        }
        .next {
          right: 10px;
        }
        .form-container {
          margin-top: 20px;
        }
        .form-group {
          margin-bottom: 15px;
        }
        .form-group label {
          display: block;
          margin-bottom: 5px;
        }
        .form-group input,
        .form-group select {
          width: 100%;
          padding: 8px;
          box-sizing: border-box;
        }
        .pay-btn {
          background-color: #4caf50;
          color: white;
          border: none;
          padding: 10px 20px;
          cursor: pointer;
        }
        .pay-btn:hover {
          background-color: #45a049;
        }
        .success-message {
          color: green;
        }
        .map-container {
          margin-top: 20px;
        }
        .map-container h2 {
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
}
