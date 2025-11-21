import { useState } from "react";
import { preconnect } from "react-dom";
import axios from "axios";
import Cuidado from "../../../models/Cuidado";
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

function CadastrarCuidado(){
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [frequencia, setFrequencia] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [tipoMensagem, setTipoMensagem] = useState<'success' | 'danger' | ''>('');
    const navigate = useNavigate();

    function LimparMensagem() {
        setTimeout(() => {
            setMensagem("");
            setTipoMensagem('');
        }, 5000);
    }

    function submeterForm(e : any){
        e.preventDefault();
        setMensagem("");
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
        setMensagem(`Cuidado "${cuidado.nomeCuidado}" cadastrado com sucesso!`);
            setTipoMensagem('success');
            
            setTimeout(() => {
                navigate("/pages/cuidado/listar");
            }, 1500);
        }
        catch(error: any)
        {
            const erroMsg = error.response?.data || "Erro desconhecido ao cadastrar o cuidado.";
            console.error("Erro ao cadastrar cuidado: " + erroMsg, error);
            setMensagem(`Erro: ${erroMsg}`);
            setTipoMensagem('danger');
            LimparMensagem();
        }
        
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
                        <button className="btn-base btn-primary" type="submit">Cadastrar</button>
                    </div>
                </form>
            </div>
        </div>
    );

}

export default CadastrarCuidado;