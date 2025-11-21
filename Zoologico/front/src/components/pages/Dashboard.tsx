import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="container-minimal">
      <h1 className="heading-primary">Centro de Gerenciamento Zoo Vita 🧑‍🔬</h1>
      <p className="description-minimal">Selecione uma das áreas de gestão abaixo para iniciar o trabalho diário.</p>

      <div className="botoes-principais-grid">
        
        <Link to="/pages/animal/listar" className="card-acao card-animal">
          <i className="fas fa-paw icon-acao"></i>
          <h3>Gerenciar Animais 🦁</h3>
          <p>Adicionar, editar e visualizar o inventário completo de fauna do zoológico.</p>
        </Link>

        <Link to="/pages/cuidado/listar" className="card-acao card-cuidado">
          <i className="fas fa-notes-medical icon-acao"></i>
          <h3>Agenda de Cuidados e Saúde 🩺</h3>
          <p>Acompanhar e marcar tarefas de alimentação, limpeza e consultas veterinárias.</p>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;