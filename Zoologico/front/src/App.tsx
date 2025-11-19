import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ListarAnimal from './components/pages/animal/ListarAnimal';

function App() {
  return (
    <div id="componente_app">
      <BrowserRouter>
      <nav>
        <ul>
          <li><Link to="pages/animal/listar">Listar Animais</Link></li>
          <li>
            <Link to="/">Cadastrar Animais</Link>
          </li>
        </ul>
      </nav>
      <div id="Conteudo">
        <Routes>
          <Route path="pages/animal/listar" element={<ListarAnimal/>}/>
        </Routes>
      </div>
      <footer>

      </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;