import React from 'react';
import { Link } from 'react-router-dom'; 

function MenuNavegacao() {
  return (
    <nav className="nav-sidebar">
      
      {/* Grupo Animais */}
      <h3 className="nav-link-group-title">Animais</h3>
      
      <Link to="/pages/animal/listar" className="nav-link">
        <span className="nav-icon">📊</span> Listagem
      </Link>
      
      <Link to="/pages/animal/cadastrar" className="nav-link">
        <span className="nav-icon">➕</span> Cadastro
      </Link>

      {/* Grupo Cuidados */}
      <h3 className="nav-link-group-title">Cuidados</h3>
      
      <Link to="/pages/cuidado/listar" className="nav-link">
        <span className="nav-icon">📋</span> Listagem
      </Link>
      
      <Link to="/pages/cuidado/cadastrar" className="nav-link">
        <span className="nav-icon">💉</span> Cadastro
      </Link>
      
    </nav>
  );
}

export default MenuNavegacao;