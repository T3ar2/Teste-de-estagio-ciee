import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
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
      <nav>
        <ul>
          <li><Link to="pages/animal/listar">Listar Animais</Link></li>
          <li><Link to={"pages/animal/cadastrar"}>Cadastrar Animais</Link></li>
          <li><Link to={"/pages/cuidado/listar"}>Listar Cuidados</Link></li>
          <li><Link to={"/pages/cuidado/cadastrar"}>Cadastrar Cuidados</Link></li>
        </ul>
      </nav>
      <div id="Conteudo">
        <Routes>
          <Route path="pages/animal/listar" element={<ListarAnimal/>}/><Route path="pages/animal/listar" element={<ListarAnimal/>}/>
          <Route path="pages/animal/cadastrar" element={<CadastrarAnimal/>}/> 
          <Route path="pages/animal/editar/:id" element={<EditarAnimal/>}/> 


          <Route path="pages/cuidado/listar" element={<ListarCuidado/>}/>
          <Route path="pages/cuidado/cadastrar" element={<CadastrarCuidado/>}/>
          <Route path="pages/cuidado/editar/:id" element={<EditarCuidado/>}/> 
        </Routes>
      </div>
      <footer>

      </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;