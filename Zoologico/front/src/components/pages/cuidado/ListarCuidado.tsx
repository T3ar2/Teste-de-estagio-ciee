import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cuidado from "../../../models/Cuidado";


function ListarCuidado(){
    const[cuidados, setCuidado] = useState<Cuidado[]>([]);
    const [termoBusca, setTermoBusca] = useState('');

    useEffect(() => {
        ListarCuidadoAPI();
    }, [])

    async function ListarCuidadoAPI() {
        try {
           const resposta = await axios.get("http://localhost:5227/api/cuidados/listar");
           const dados = resposta.data;
           console.log("Dados recebidos da API:", dados); 
           
           if (Array.isArray(dados)) {
               setCuidado(dados); 
           } else {
               console.error("A API não retornou um array.");
               setCuidado([]);
           }
        } catch (error) {
            console.log("Erro ao buscar dados da API. Detalhes: " + error);
            setCuidado([]);
        }
    }

    function DeletarCuidadoAPI(id: number){
        DeletarCuidado(id);
    }

    async function DeletarCuidado(id : number) {
        try {
            const resposta = await axios.delete(`http://localhost:5227/api/cuidados/deletar/${id}`)
            ListarCuidadoAPI();
            console.log(`${id} deletado com sucesso.`);
        } catch (error) {
            console.log(error)
        }
    }
    
    const cuidadosFiltrados = cuidados.filter(cuidado => 
        cuidado.nomeCuidado.toLowerCase().includes(termoBusca.toLowerCase()) || 
        cuidado.descricao.toLowerCase().includes(termoBusca.toLowerCase())
    );

    return(
        <div className="container-minimal">
            
            <div className="list-header">
                <h1 className="heading-primary">Lista de Cuidados</h1>
                <Link to="/pages/cuidado/cadastrar" className="btn-base btn-primary">Cadastrar Novo Cuidado</Link>
            </div>

            <div className="card-minimal" style={{padding: '0'}}>

                <div className="search-area" style={{padding: '20px'}}> 
                    <input 
                        type="text"
                        placeholder="Pesquisar por nome ou descrição..."
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
                            <th>Frequência</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cuidadosFiltrados.map((cuidado) => (
                            <tr key={cuidado.id}> 
                                <td>{cuidado.id}</td>
                                <td>{cuidado.nomeCuidado}</td>
                                <td>{cuidado.descricao}</td>
                                <td>{cuidado.frequencia}</td>
                                <td>
                                    <Link to={`/pages/cuidado/editar/${cuidado.id}`} className="btn-base btn-secondary">
                                        <i className="fas fa-edit"></i> Editar
                                    </Link>

                                    <button onClick={() => DeletarCuidado(cuidado.id as number)} className="btn-base btn-danger">
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
export default ListarCuidado;