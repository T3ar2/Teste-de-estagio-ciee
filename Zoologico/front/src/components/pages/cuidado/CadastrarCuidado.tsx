import { useState } from "react";
import { preconnect } from "react-dom";
import axios from "axios";
import Cuidado from "../../../models/Cuidado";

function CadastrarCuidado(){
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [frequencia, setFrequencia] = useState("");

    function submeterForm(e : any){
        e.preventDefault();
        enviarAnimalAPI();
    }

    async function enviarAnimalAPI(){
        try{
        const cuidado : Cuidado = {
            nomeCuidado: nome,
            descricao: descricao,
            frequencia: frequencia,
        }

        const resposta = await axios.post ("http://localhost:5227/api/cuidado/cadastrar", cuidado);
        console.log (resposta.data);
        }
        catch(error)
        {console.log("Erro ao cadastrar produto: " + error);}
        
    }

    return (
        <div>
            <h1>Cadastrar Animal</h1>
            <form onSubmit={submeterForm}>
                <div>
                    <label>Nome: </label>    
                    <input type="text" onChange={ (e : any) =>setNome(e.target.value)}required/>
                </div>
                <div>
                    <label>Descrição: </label>
                    <input type="text" onChange={(e : any) =>setDescricao(e.target.value)} required/>
                </div>
                <div>
                    <label>Frequência: </label>
                    <input type="text" onChange={(e : any) =>setFrequencia(e.target.value)} required/>
                </div>
                <div>
                    <button type="submit">Cadastrar</button>
                </div>
            </form>
        </div>
    );

}

export default CadastrarCuidado;