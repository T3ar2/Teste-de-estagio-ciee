import { useEffect, useState } from "react";
import Animal from "../../../models/Animal";
import axios from "axios";
import { useParams } from "react-router-dom";
import { preconnect } from "react-dom";

function EditarAnimal(){
    const {id} = useParams();
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [especie, setEspecie] = useState("");
    const [habitat, setHabitat] = useState("");
    const [paisDeOrigem, setPaisDeOrigem] = useState("");


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

        const resposta = await axios.post (`http://localhost:5227/api/animal/atualizar/${animal.id}`, animal);
        console.log (resposta.data);
        }
        catch(error)
        {console.log("Erro ao cadastrar cuidado: " + error);}
        
    }
    
   
    return (
        <div>
            <h1>Cadastrar Animal</h1>
            <form onSubmit={submeterForm}>
                <div>
                    <label>Nome: </label>    
                    <input value={nome} type="text" onChange={ (e : any) =>setNome(e.target.value)}required/>
                </div>
                <div>
                    <label>Descrição: </label>
                    <input value={descricao} type="text" onChange={(e : any) =>setDescricao(e.target.value)} required/>
                </div>
                <div>
                    <label>Data de Nascimento: </label>
                    <input value={dataNascimento} type="date" onChange={(e : any) =>setDataNascimento(e.target.value)} required/>
                </div>
                <div>
                    <label>Espécie: </label>
                    <input value={especie} type="text" onChange={(e : any) =>setEspecie(e.target.value)} required/>
                </div>
                <div>
                    <label>Habitat: </label>
                    <input value={habitat} type="text" onChange={(e : any) =>setHabitat(e.target.value)} required/>
                </div>
                <div>
                    <label>País de origem: </label>
                    <input value={paisDeOrigem} type="text" onChange={(e : any) =>setPaisDeOrigem(e.target.value)} required/>
                </div>
                <div>
                    <button type="submit">Salvar</button>
                </div>
            </form>
        </div>
    );

    
}

export default EditarAnimal;