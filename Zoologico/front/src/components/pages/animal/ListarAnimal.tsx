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
           const resposta = await axios.get("http://localhost:5227/api/animais/listar");
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

    function DeletarAnimalAPI(id: number){
        DeletarAnimal(id);
    }

    async function DeletarAnimal(id : number) {
        try {
            const resposta = await axios.delete(`http://localhost:5227/api/animais/deletar/${id}`)
            ListarAnimalAPI();
            console.log(`${id} deletado com sucesso.`);
        } catch (error) {
            console.log(error)
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
                            <tr key={animal.id}> 
                                <td>{animal.id}</td>
                                <td>{animal.nome}</td>
                                <td>{animal.descricao}</td>
                                <td>{animal.dataNascimento}</td>
                                <td>{animal.especie}</td>
                                <td>{animal.habitat}</td>
                                <td>{animal.paisDeOrigem}</td>
                                
                                <td>
                                    <Link to={`/pages/animal/editar/${animal.id}`}>Editar</Link>
                                    <button onClick={() => DeletarAnimal(animal.id!)}>Excluir</button>
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