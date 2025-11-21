import { useEffect, useState } from "react";
import Cuidado from "../../../models/Cuidado";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
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

function EditarCuidado(){
    const {id} = useParams();
    const [nomeCuidado, setNomeCuidado] = useState("");
    const [descricao, setDescricao] = useState("");
    const [frequencia, setFrequencia] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [tipoMensagem, setTipoMensagem] = useState<'success' | 'danger' | ''>('');
    const navigate = useNavigate();
    


    useEffect(() => {
        BuscarCuidado();
    }, [id]);

    function LimparMensagem() {
        setTimeout(() => {
            setMensagem("");
            setTipoMensagem('');
        }, 5000);
    }


    async function BuscarCuidado() {
        try {
            const resposta = await axios.get<Cuidado>(`http://localhost:5227/api/cuidados/buscar/${id}`);
            setNomeCuidado(resposta.data.nomeCuidado);
            setDescricao(resposta.data.descricao);
            setFrequencia(resposta.data.frequencia);
        } catch(error) {
             console.error("Erro ao buscar cuidado para edição: " + error);
             setMensagem("Erro ao carregar dados do cuidado para edição.");
             setTipoMensagem('danger');
        }
        
    }

    function submeterForm(e : any){
        e.preventDefault();
        setMensagem("");
        EnviarCuidadoAPI();
    }

    async function EnviarCuidadoAPI(){
        try{
        const cuidado : Cuidado = {
            nomeCuidado : nomeCuidado,
            descricao : descricao,
            frequencia : frequencia,
        }

        const resposta = await axios.patch (`http://localhost:5227/api/cuidados/atualizar/${id}`, cuidado);
        console.log (resposta.data);

        setMensagem(`Cuidado "${cuidado.nomeCuidado}" atualizado com sucesso!`);
        setTipoMensagem('success');
        
        setTimeout(() => {
            navigate("/pages/cuidado/listar");
        }, 1500);

        }
        catch(error: any)
        {
            const erroMsg = error.response?.data || "Erro desconhecido ao atualizar o cuidado.";
            console.error("Erro ao atualizar cuidado: " + erroMsg, error);
            setMensagem(`Erro: ${erroMsg}`);
            setTipoMensagem('danger');
            LimparMensagem();
        }
        
    }
    
   
    return (
        <div className="container-minimal">
            <div className="card-minimal">
                <h1 className="heading-primary">Editar Cuidado:</h1>
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
                        <button className="btn-base btn-primary" type="submit">Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    );

    
}

export default EditarCuidado;