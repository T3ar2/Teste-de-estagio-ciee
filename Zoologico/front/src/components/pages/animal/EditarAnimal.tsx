import { useEffect, useState } from "react";
import Animal from "../../../models/Animal";
import axios from "axios";
import {  useParams, useNavigate } from "react-router-dom";
import { preconnect } from "react-dom";

const MessageDisplay = ({ message, type }: { message: string, type: 'success' | 'danger' | '' }) => {
    if (!message) return null;
    const baseStyle = "alert-minimal";
    const typeStyle = type === 'success' ? 'alert-success' : 'alert-danger';
    return (
        <div className={`${baseStyle} ${typeStyle}`} style={{ marginBottom: '20px', padding: '10px', borderRadius: '5px' }}>
            {message}
        </div>
    );
};

function EditarAnimal(){
    const {id} = useParams();
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [especie, setEspecie] = useState("");
    const [habitat, setHabitat] = useState("");
    const [paisDeOrigem, setPaisDeOrigem] = useState("");
    const navigate = useNavigate();
    const [mensagem, setMensagem] = useState("");
    const [tipoMensagem, setTipoMensagem] = useState<'success' | 'danger' | ''>('');


    useEffect(() => {
        BuscarAnimal();
    }, [id]);


    async function BuscarAnimal () {
        const resposta = await axios.get<Animal>(`http://localhost:5227/api/animais/buscar/${id}`);
        setNome(resposta.data.nome);
        setDescricao(resposta.data.descricao);
        setDataNascimento(resposta.data.dataNascimento);
        setEspecie(resposta.data.especie);
        setHabitat(resposta.data.habitat);
        setPaisDeOrigem(resposta.data.paisDeOrigem);
    }

    function LimparMensagem() {
        setTimeout(() => {
            setMensagem("");
            setTipoMensagem('');
        }, 5000);
    }

    function submeterForm(e : any){
        e.preventDefault();
        setMensagem("");
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

        const resposta = await axios.patch (`http://localhost:5227/api/animais/atualizar/${id}`, animal);
        console.log (resposta.data);
        setMensagem(`Animal "${animal.nome}" atualizado com sucesso!`);
        setTipoMensagem('success');
        setTimeout(() => {
            navigate("/pages/animal/listar");
        }, 1500);
        }
        catch(error: any)
        {
            const erroMsg = error.response?.data || "Erro desconhecido ao atualizar o animal.";
            console.error("Erro ao atualizar animal: " + erroMsg, error);
            setMensagem(`Erro: ${erroMsg}`);
            setTipoMensagem('danger');
            LimparMensagem();

        }
        
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