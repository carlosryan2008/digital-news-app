'use client';

import React from 'react';
import './footer.css'; // Certifique-se de criar este arquivo CSS para estilizar o footer

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          {/* Seção de informações */}
          <div className="col-md-4">
            <h5>Sobre Nós</h5>
            <p>
            Nosso propósito é mergulhar profundamente nos eventos que moldaram o passado e iluminar o caminho para o entendimento do presente e do futuro.
            </p>
          </div>
          
          {/* Seção de links importantes */}
          <div className="col-md-4">
            <h5>Saiba Mais</h5>
            <ul>
              <li><a href="https://www.google.com/">Períodos Históricos</a></li>
              <li><a href="https://www.google.com/">Fatos Históricos</a></li>
              <li><a href="https://www.google.com/">Personalidades Históricas</a></li>
            </ul>
          </div>
          
          {/* Seção de contato */}
          <div className="col-md-4">
            <h5>Contato</h5>
            <p>
              Email: <a href="mailto:info@example.com">info@example.com</a><br />
              Telefone: +55 99 99999-9999<br />
              Endereço: Rua das Flores, 123, Limoeiro, LM
            </p>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-12 text-center">
            <p>&copy; 2024 Brasil Histórico. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
