import { useState, useEffect } from "react";
import Animal from "../../../models/Animal";
import axios from "axios";
import { Link } from "react-router-dom";


function ListarAnimal(){
    const[animais, setAnimais] = useState<Animal[]>([]);
    const [termoBusca, setTermoBusca] = useState('');

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

    const animaisFiltrados = animais.filter(animal => 
        animal.nome.toLowerCase().includes(termoBusca.toLowerCase()) || 
        animal.especie.toLowerCase().includes(termoBusca.toLowerCase())
    );

    return(
        <div className="container-minimal">
            
            <div className="list-header">
                <h2 className="heading-secondary">Lista de Animais</h2>
                {/* Este é o botão "Cadastrar Novo Animal" */}
                <Link to="/pages/animal/cadastrar" className="btn-base btn-primary">
                    <i className="fas fa-plus"></i> Cadastrar Novo Animal
                </Link>
            </div>
            <div className="card-minimal" style={{padding: '0'}}>
                
                <div className="search-area" style={{padding: '20px'}}> 
                    <input 
                        type="text"
                        placeholder="Pesquisar por nome ou espécie..."
                        className="search-bar-minimal"
                        value={termoBusca}
                        onChange={(e) => setTermoBusca(e.target.value)}
                    />
                </div>

                <table className="table-minimalist">
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
                        {animaisFiltrados.map((animal) => (
                            <tr key={animal.id}> 
                                <td>{animal.id}</td>
                                <td>{animal.nome}</td>
                                <td>{animal.descricao}</td>
                                <td>{animal.dataNascimento}</td>
                                <td>{animal.especie}</td>
                                <td>{animal.habitat}</td>
                                <td>{animal.paisDeOrigem}</td>
                                
                                <td>
                                    <Link to={`/pages/animal/editar/${animal.id}`} className="btn-base btn-secondary">
                                        <i className="fas fa-edit"></i> Editar
                                    </Link>

                                    <button onClick={() => DeletarAnimal(animal.id as number)} className="btn-base btn-danger">
                                        <i className="fas fa-trash-alt"></i> Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default ListarAnimal;