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
        const resposta = await axios.get<Cuidado>(`http://localhost:5227/api/cuidadops/buscar/${id}`);
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
        <div>
            <h1>Cadastrar Animal</h1>
            <form onSubmit={submeterForm}>
                <div>
                    <label>Nome: </label>    
                    <input value={nomeCuidado} type="text" onChange={ (e : any) =>setNomeCuidado(e.target.value)}required/>
                </div>
                <div>
                    <label>Descrição: </label>
                    <input value={descricao} type="text" onChange={(e : any) =>setDescricao(e.target.value)} required/>
                </div>
                <div>
                    <label>Frequência: </label>
                    <input value={frequencia} type="text" onChange={(e : any) =>setFrequencia(e.target.value)} required/>
                </div>
                <div>
                    <button type="submit">Salvar</button>
                </div>
            </form>
        </div>
    );

    
}

export default EditarCuidado;