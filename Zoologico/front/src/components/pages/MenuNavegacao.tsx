import React from 'react';
import { Link } from 'react-router-dom';

function MenuNavegacao() {
  return (
    <nav className="sidebar-nav">
      <ul>
        <li>
          <Link to="/" className="nav-link">
            <i className="fas fa-home"></i> Início / Dashboard
          </Link>
        </li>
        <li className="nav-separator"></li>
        
        <li>
          <Link to="/pages/animal/listar" className="nav-link">
            <i className="fas fa-paw"></i> Gerenciar Animais
          </Link>
        </li>
        
        <li>
          <Link to="/pages/cuidado/listar" className="nav-link">
            <i className="fas fa-notes-medical"></i> Cuidados e Agenda
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default MenuNavegacao;