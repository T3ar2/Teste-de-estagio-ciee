import { useEffect, useState } from "react";
import Animal from "../../../models/Animal";
import axios from "axios";
import {  useParams, useNavigate } from "react-router-dom";
import { preconnect } from "react-dom";

function EditarAnimal(){
    const {id} = useParams();
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [especie, setEspecie] = useState("");
    const [habitat, setHabitat] = useState("");
    const [paisDeOrigem, setPaisDeOrigem] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        BuscarAnimal();
    }, []);


    async function BuscarAnimal () {
        const resposta = await axios.get<Animal>(`http://localhost:5227/api/animais/buscar/${id}`);
        setNome(resposta.data.nome);
        setDescricao(resposta.data.descricao);
        setDataNascimento(resposta.data.dataNascimento);
        setEspecie(resposta.data.especie);
        setHabitat(resposta.data.habitat);
        setPaisDeOrigem(resposta.data.paisDeOrigem);
    }

    function submeterForm(e : any){
        e.preventDefault();
        EnviarAnimalAPI();
        navigate(-1);
    }

    async function EnviarAnimalAPI(){
        try{
        const animal : Animal = {
            nome: nome,
            descricao: descricao,
            dataNascimento: dataNascimento,
            especie: especie,
            habitat: habitat,
            paisDeOrigem: paisDeOrigem,
        }

        const resposta = await axios.patch (`http://localhost:5227/api/animais/atualizar/${id}`, animal);
        console.log (resposta.data);
        }
        catch(error)
        {console.log("Erro ao atualizar animal: " + error);}
        
    }
    
   
    return (
        <div className="container-minimal">
            <div className="card-minimal">
                <h1 className="heading-primary">Editar Animal:</h1>
                <form onSubmit={submeterForm}>
                    <div className="form-group">
                        <label className="label-minimal">Nome: </label>    
                        <input value={nome} className="input-minimal" type="text" onChange={ (e : any) =>setNome(e.target.value)}required/>
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
                    
                    <div className="form-row"> 
                        <div className="form-group"> 
                            <label className="label-minimal">Data de Nascimento: </label>
                            <input value={dataNascimento} className="input-minimal" type="date" onChange={(e : any) =>setDataNascimento(e.target.value)} required/>
                        </div>
                        <div className="form-group">
                            <label className="label-minimal">Espécie: </label>
                            <input value={especie} className="input-minimal" type="text" onChange={(e : any) =>setEspecie(e.target.value)} required/>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="label-minimal">Habitat: </label>
                            <input value={habitat} className="input-minimal" type="text" onChange={(e : any) =>setHabitat(e.target.value)} required/>
                        </div>
                        <div className="form-group">
                            <label className="label-minimal">País de origem: </label>
                            <input value={paisDeOrigem} className="input-minimal" type="text" onChange={(e : any) =>setPaisDeOrigem(e.target.value)} required/>
                        </div>
                    </div>

                    <div className="text-right">
                        <button className="btn-base btn-primary" type="submit">Salvar Alterações</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditarAnimal;