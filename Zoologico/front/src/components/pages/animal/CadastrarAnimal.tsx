import { useState } from "react";
import { preconnect } from "react-dom";
import axios from "axios";
import Animal from "../../../models/Animal";
import { useNavigate } from "react-router-dom";

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

function CadastrarAnimal(){
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [especie, setEspecie] = useState("");
    const [habitat, setHabitat] = useState("");
    const [paisDeOrigem, setPaisDeOrigem] = useState("");
    const navigator = useNavigate();
    const [mensagem, setMensagem] = useState("");
    const [tipoMensagem, setTipoMensagem] = useState<'success' | 'danger' | ''>('');

    function submeterForm(e : any){
        e.preventDefault();
        enviarAnimalAPI();
    }

    function LimparMensagem() {
        setTimeout(() => {
            setMensagem("");
            setTipoMensagem('');
        }, 5000);
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
        

        const resposta = await axios.post ("http://localhost:5227/api/animais/cadastrar", animal);
        console.log (resposta.data);
        setMensagem(`Animal "${animal.nome}" cadastrado com sucesso!`);
        setTipoMensagem('success');
        setTimeout(() => {
                navigator("/pages/animal/listar"); // Assumindo a rota de listagem
            }, 1500);   



        }
        catch(error: any){
            const erroMsg = error.response?.data || "Erro desconhecido ao cadastrar o animal.";
            console.error("Erro ao cadastrar animal: ", erroMsg, error);
            setMensagem(`Erro: ${erroMsg}`);
            setTipoMensagem('danger');
            LimparMensagem();
        }
        
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
                        <button className="btn-base btn-primary" type="submit" >Cadastrar</button>
                    </div>
                </form>
            </div>
        </div>
    );

}

export default CadastrarAnimal;