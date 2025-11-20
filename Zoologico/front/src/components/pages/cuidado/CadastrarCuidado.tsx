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
        <div className="container-minimal">
            <div className="card-minimal">
                <h1 className="heading-primary">Cadastrar Cuidado</h1>
                <form onSubmit={submeterForm}>
                    <div className="form-group">
                        <label className="label-minimal">Nome: </label>    
                        <input className="input-minimal" type="text" onChange={ (e : any) =>setNome(e.target.value)}required/>
                    </div>
                    <div className="form-group">
                        <label className="label-minimal">Descrição: </label>
                        <textarea
                            className="input-minimal"
                            rows={3}
                            onChange={(e : any) =>setDescricao(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="label-minimal">Frequência: </label>
                        <input className="input-minimal" type="text" onChange={(e : any) =>setFrequencia(e.target.value)} required/>
                    </div>
                    <div className="text-right">
                        <button className="btn-primary" type="submit">Cadastrar</button>
                    </div>
                </form>
            </div>
        </div>
    );

}

export default CadastrarCuidado;