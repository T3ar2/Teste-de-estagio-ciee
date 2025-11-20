import { useEffect, useState } from "react";
import Cuidado from "../../../models/Cuidado";
import axios from "axios";
import { useParams } from "react-router-dom";
import { preconnect } from "react-dom";

function EditarCuidado(){
    const {id} = useParams();
    const [nomeCuidado, setNomeCuidado] = useState("");
    const [descricao, setDescricao] = useState("");
    const [frequencia, setFrequencia] = useState("");
    


    useEffect(() => {
        BuscarCuidado();
    }, []);


    async function BuscarCuidado() {
        const resposta = await axios.get<Cuidado>(`http://localhost:5227/api/cuidados/buscar/${id}`);
        setNomeCuidado(resposta.data.nomeCuidado);
        setDescricao(resposta.data.descricao);
        setFrequencia(resposta.data.frequencia);
        
    }

    function submeterForm(e : any){
        e.preventDefault();
        EnviarCuidadoAPI();
    }

    async function EnviarCuidadoAPI(){
        try{
        const cuidado : Cuidado = {
            nomeCuidado : nomeCuidado,
            descricao : descricao,
            frequencia : frequencia,
        }

        const resposta = await axios.post (`http://localhost:5227/api/cuidados/atualizar/${cuidado.id}`, cuidado);
        console.log (resposta.data);
        }
        catch(error)
        {console.log("Erro ao cadastrar cuiadado: " + error);}
        
    }
    
   
    return (
        <div className="container-minimal">
            <div className="card-minimal">
                <h1 className="heading-primary">Editar Cuidado: ID #{id}</h1>
                <form onSubmit={submeterForm}>
                    <div className="form-group">
                        <label className="label-minimal">Nome: </label>    
                        <input value={nomeCuidado} className="input-minimal" type="text" onChange={ (e : any) =>setNomeCuidado(e.target.value)}required/>
                    </div>
                    <div className="form-group">
                        <label className="label-minimal">Descrição: </label>
                        <textarea 
                            value={descricao} 
                            className="input-minimal" 
                            rows={3}
                            onChange={(e : any) =>setDescricao(e.target.value)} 
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="label-minimal">Frequência: </label>
                        <input value={frequencia} className="input-minimal" type="text" onChange={(e : any) =>setFrequencia(e.target.value)} required/>
                    </div>
                    <div className="text-right">
                        <button className="btn-primary" type="submit">Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    );

    
}

export default EditarCuidado;