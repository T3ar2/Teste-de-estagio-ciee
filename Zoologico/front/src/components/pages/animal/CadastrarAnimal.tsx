import { useState } from "react";
import { preconnect } from "react-dom";
import axios from "axios";
import Animal from "../../../models/Animal";

function CadastrarAnimal(){
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [especie, setespecie] = useState("");
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
                    <label>Data de Nascimento: </label>
                    <input type="date" onChange={(e : any) =>setDataNascimento(e.target.value)} required/>
                </div>
                <div>
                    <label>Espécie: </label>
                    <input type="text" onChange={(e : any) =>setespecie(e.target.value)} required/>
                </div>
                <div>
                    <label>Habitat: </label>
                    <input type="text" onChange={(e : any) =>setHabitat(e.target.value)} required/>
                </div>
                <div>
                    <label>País de origem: </label>
                    <input type="text" onChange={(e : any) =>setPaisDeOrigem(e.target.value)} required/>
                </div>
                <div>
                    <button type="submit">Cadastrar</button>
                </div>
            </form>
        </div>
    );

}

export default CadastrarAnimal;