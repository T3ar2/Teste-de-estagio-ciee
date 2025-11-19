import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cuidado from "../../../models/Cuidado";


function ListarCuidado(){
    // 1. ESTADO: Armazena a lista de animais
    const[cuidados, setCuidado] = useState<Cuidado[]>([]);

    // 2. BUSCA DE DADOS
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

    return(
        <div>
            <h1>Lista de Animais</h1>


                <table>
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
                        {cuidados.map((cuidado) => (
                            <tr key={cuidado.id}> 
                                <td>{cuidado.id}</td>
                                <td>{cuidado.nomeCuidado}</td>
                                <td>{cuidado.descricao}</td>
                                <td>{cuidado.frequencia}</td>
                                <td>
                                    <Link to={`/pages/cuidado/editar/${cuidado.id}`}>Editar</Link>
                                    <Link to={`/pages/cuidado/deletar/${cuidado.id}`}>Excluir</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            
            
            <div>
                <Link to="/pages/cuidado/cadastrar">Cadastrar Novo Animal</Link>
            </div>
        </div>
    );
}
export default ListarCuidado;