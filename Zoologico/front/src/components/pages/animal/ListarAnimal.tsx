import { useState, useEffect } from "react";
import Animal from "../../../models/Animal";
import axios from "axios";
import { Link } from "react-router-dom";


function ListarAnimal(){
    const[animais, setAnimais] = useState<Animal[]>([]);

    useEffect(() => {
        ListarAnimalAPI();
    }, [])

    async function ListarAnimalAPI() {
        try {
           const resposta = await axios.get("http://localhost:5227/api/animal/listar");
           const dados = resposta.data;
           console.log("Dados recebidos da API:", resposta); 
           
           if (Array.isArray(dados)) {
               setAnimais(dados); 
           } else {
               console.error("A API não retornou um array.");
               setAnimais([]);
           }
        } catch (error) {
            console.log("Erro ao buscar dados da API. Detalhes: " + error);
            setAnimais([]);
        }
    }
    return(
        <div>
            <h1>Lista de Animais</h1>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nome</th>
                            <th>Descricao</th>
                            <th>DataNascimento</th>
                            <th>Especie</th>
                            <th>Habitat</th>
                            <th>PaisDeOrigem</th>
                            <th>Ações</th> 
                        </tr>
                    </thead>
                    <tbody>
                        {animais.map((animal) => (
                            <tr key={animal.Id}> 
                                <td>{animal.Id}</td>
                                <td>{animal.Nome}</td>
                                <td>{animal.Descricao}</td>
                                <td>{animal.DataNascimento}</td>
                                <td>{animal.Especie}</td>
                                <td>{animal.Habitat}</td>
                                <td>{animal.PaisDeOrigem}</td>
                                
                                <td>
                                    <Link to={`/pages/animal/editar/${animal.Id}`}>Editar</Link>
                                    <Link to={`/pages/animal/deletar/${animal.Id}`}>Excluir</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            <div>
                <Link to="/pages/animal/cadastrar">Cadastrar Novo Animal</Link>
            </div>
        </div>
    );
}
export default ListarAnimal;