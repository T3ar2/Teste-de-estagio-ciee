import { useState } from "react";
import { preconnect } from "react-dom";
import axios from "axios";
import Animal from "../../../models/Animal";

function CadastrarAnimal(){
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [especie, setEspecie] = useState("");
    const [habitat, setHabitat] = useState("");
    const [paisDeOrigem, setPaisDeOrigem] = useState("");

    function submeterForm(e : any){
        e.preventDefault();
        enviarAnimalAPI();
    }

    async function enviarAnimalAPI(){
        try{
        const animal : Animal = {
            nome: nome,
            descricao: descricao,
            dataNascimento: dataNascimento,
            especie: especie,
            habitat: habitat,
            paisDeOrigem: paisDeOrigem,
        }

        const resposta = await axios.post ("http://localhost:5227/api/animal/cadastrar", animal);
        console.log (resposta.data);
        }
        catch(error)
        {console.log("Erro ao cadastrar produto: " + error);}
        
    }

    return (
        <div className="container-minimal">
            <div className="card-minimal">
                <h1 className="heading-primary">Cadastrar Animal</h1>
                <form onSubmit={submeterForm}>
                    <div className="form-group">
                        <label className="label-minimal">Nome: </label>    
                        <input className="input-minimal" type="text" onChange={ (e : any) =>setNome(e.target.value)}required/>
                    </div>
                    <div className="form-group">
                        <label className="label-minimal">Descrição: </label>
                        <input className="input-minimal" type="text" onChange={(e : any) =>setDescricao(e.target.value)} required/>
                    </div>
                    <div className="form-group">
                        <label className="label-minimal">Data de Nascimento: </label>
                        <input className="input-minimal" type="date" onChange={(e : any) =>setDataNascimento(e.target.value)} required/>
                    </div>
                    <div className="form-group">
                        <label className="label-minimal">Espécie: </label>
                        <input className="input-minimal" type="text" onChange={(e : any) =>setEspecie(e.target.value)} required/>
                    </div>
                    <div className="form-group">
                        <label className="label-minimal">Habitat: </label>
                        <input className="input-minimal" type="text" onChange={(e : any) =>setHabitat(e.target.value)} required/>
                    </div>
                    <div className="form-group">
                        <label className="label-minimal">País de origem: </label>
                        <input className="input-minimal" type="text" onChange={(e : any) =>setPaisDeOrigem(e.target.value)} required/>
                    </div>
                    <div>
                        <button className="btn-primary" type="submit">Cadastrar</button>
                    </div>
                </form>
            </div>
        </div>
    );

}

export default CadastrarAnimal;