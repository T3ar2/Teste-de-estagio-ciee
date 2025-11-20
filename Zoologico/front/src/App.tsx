import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// Importando os novos componentes de Menu
import MenuPrincipal from './components/MenuPrincipal'; 
import MenuNavegacao from './components/MenuNavegacao'; 

import ListarAnimal from './components/pages/animal/ListarAnimal';
import ListarCuidado from './components/pages/cuidado/ListarCuidado';
import CadastrarAnimal from './components/pages/animal/CadastrarAnimal';
import CadastrarCuidado from './components/pages/cuidado/CadastrarCuidado';
import EditarAnimal from './components/pages/animal/EditarAnimal';
import EditarCuidado from './components/pages/cuidado/EditarCuidado';


function App() {
  return (
    <div id="componente_app">
      <BrowserRouter>
        
        {/* 1. Menu Principal (Topo/Header) */}
        <MenuPrincipal />

        {/* 2. Layout Principal: Sidebar + Conteúdo */}
        <div className="app-layout">
          
          {/* Sidebar com Menu de Navegação */}
          <div className="app-sidebar">
            <MenuNavegacao />
          </div>

          {/* Área de Conteúdo (onde as rotas são carregadas) */}
          <div className="app-content">
            <Routes>
              {/* Rotas de Animais */}
              <Route path="/pages/animal/listar" element={<ListarAnimal/>}/>
              <Route path="/pages/animal/cadastrar" element={<CadastrarAnimal/>}/> 
              <Route path="/pages/animal/editar/:id" element={<EditarAnimal/>}/> 

              {/* Rotas de Cuidados */}
              <Route path="/pages/cuidado/listar" element={<ListarCuidado/>}/>
              <Route path="/pages/cuidado/cadastrar" element={<CadastrarCuidado/>}/>
              <Route path="/pages/cuidado/editar/:id" element={<EditarCuidado/>}/> 


              {/* Rota Inicial (Dashboard Simples) */}
              <Route path="/" element={<h1 className="container-minimal heading-primary">Bem-vindo ao Zoo Vita! Selecione uma opção no menu lateral.</h1>} />
            </Routes>
          </div>
        </div>

      <footer>
        {/* Footer Minimalista opcional aqui */}
      </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;