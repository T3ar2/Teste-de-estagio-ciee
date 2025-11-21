import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MenuPrincipal from './components/pages/MenuPrincipal'; 
import MenuNavegacao from './components/pages/MenuNavegacao'; 

import Dashboard from './components/pages/Dashboard';

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
        
        <MenuPrincipal />

        <div className="app-layout">
          
          <div className="app-sidebar">
            <MenuNavegacao />
          </div>

          <div className="app-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              
              <Route path="/pages/animal/listar" element={<ListarAnimal/>}/>
              <Route path="/pages/animal/cadastrar" element={<CadastrarAnimal/>}/> 
              <Route path="/pages/animal/editar/:id" element={<EditarAnimal/>}/> 

              <Route path="/pages/cuidado/listar" element={<ListarCuidado/>}/>
              <Route path="/pages/cuidado/cadastrar" element={<CadastrarCuidado/>}/>
              <Route path="/pages/cuidado/editar/:id" element={<EditarCuidado/>}/> 
            </Routes>
          </div>
        </div>

      <footer>
      </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;