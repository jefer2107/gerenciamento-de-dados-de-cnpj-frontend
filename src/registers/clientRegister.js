import { useEffect, useState } from "react"
import axios from 'axios'
import { useParams } from "react-router-dom"


export default function ClientRegister(){
    const [client, setClient] = useState({})
    const [activity, setActivity] = useState([])
    const [corporate, setCorporate] = useState([])
    let {id} = useParams()

    useEffect(()=>{
        axios.get(`http://localhost:3001/clients/${id}/getCNPJ`)
            .then((x)=>{
                setClient(x.data)
            })
            .catch((error)=>{
                console.log(error)
            })
    },[id])

    const changeClient = ({target})=>{
        setClient((state)=>{
            return {...state,[target.name]: target.value}
        })
    }

    const changeActivity = ({target})=>{
        setActivity((state)=>{
            return {secondary_activity:state.map((x)=>{
                return {...x,[target.name]: target.value}
            })}
    
        })

    }

    const sendClient = async ()=>{
        try {
            const {data} = axios.post(`http://localhost:3001/clients/create`,client)
            return data

        } catch(error) {
            return error
        }
    }

    const sendActivity = async ()=>{
        activity.map((x)=>{

            try {
                const {data} = axios.post(`http://localhost:3001/secondaryActivity/create`,{x})
                return data
    
            } catch(error) {
                return error
            }
        })
        
    }

    const sendCorporate = async ()=>{
        corporate.map((x)=>{

            try {
                const {data} = axios.post(`http://localhost:3001/corporateStructure/create`,{x})
                return data
    
            } catch(error) {
                return error
            }
        })
        
    }

    const register = async ()=>{

        await sendClient
        await sendActivity
        await sendCorporate

    }

    return(
        <div className="form-style">
            <h2 className="text-center">Cadastro de Cliente</h2>
            {JSON.stringify(activity)}
            <form className="mx-auto">
                <div>
                    <h3 className="text-center">Dados Cadastrais</h3>
                    <div className="form-group">
                        <label>Data situação:</label>
                        <input onChange={changeClient} className="form-control" type="text" name="date_situation" value={client.date_situation} />
                    </div>
                    <div className="form-group">
                        <label>Tipo:</label>
                        <input onChange={changeClient} className="form-control" type="text" name="type" value={client.type} />
                    </div>
                    <div className="form-group">
                        <label>Município:</label>
                        <input onChange={changeClient} className="form-control" type="text" name="sth" value={client.sth} />
                    </div>
                    <div className="form-group">
                        <label>Telefone:</label>
                        <input onChange={changeClient} className="form-control" type="text" name="telephone" value={client.telephone} />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input onChange={changeClient} className="form-control" type="email" name="email" value={client.email} />
                    </div>
                    <div className="form-group">
                        <label>Situação:</label>
                        <input onChange={changeClient} className="form-control" type="text" name="situation" value={client.situation} />
                    </div>
                    <div className="form-group">
                        <label>Bairro:</label>
                        <input onChange={changeClient} className="form-control" type="text" name="district" value={client.district} />
                    </div>
                    <div className="form-group">
                        <label>Logradouro:</label>
                        <input onChange={changeClient} className="form-control" type="text" name="address" value={client.address} />
                    </div>
                    <div className="form-group">
                        <label>Número:</label>
                        <input onChange={changeClient} className="form-control" type="text" name="number" value={client.number} />
                    </div>
                    <div className="form-group">
                        <label>Cep:</label>
                        <input onChange={changeClient} className="form-control" type="text" name="zip_code" value={client.zip_code} />
                    </div>
                    <div className="form-group">
                        <label>Cidade:</label>
                        <input onChange={changeClient} className="form-control" type="text" name="city" value={client.city} />
                    </div>
                    <div className="form-group">
                        <label>Porte:</label>
                        <input onChange={changeClient} className="form-control" type="text" name="company_size" value={client.company_size} />
                    </div>
                    <div className="form-group">
                        <label>Abertura:</label>
                        <input onChange={changeClient} className="form-control" type="text" name="opening" value={client.opening} />
                    </div>
                    <div className="form-group">
                        <label>Natureza legal:</label>
                        <input onChange={changeClient} className="form-control" type="text" name="legal_nature" value={client.legal_nature} />
                    </div>
                    <div className="form-group">
                        <label>Nome fantasia:</label>
                        <input onChange={changeClient} className="form-control" type="text" name="fantasy" value={client.fantasy} />
                    </div>
                    <div className="form-group">
                        <label>CNPJ:</label>
                        <input onChange={changeClient} className="form-control" type="text" name="cnpj" value={client.cnpj} />
                    </div>
                    <div className="form-group">
                        <label>status:</label>
                        <input onChange={changeClient} className="form-control" type="text" name="status" value={client.status} />
                    </div>
                    <div className="form-group">
                        <label>Complemento:</label>
                        <input onChange={changeClient} className="form-control" type="text" name="complement" value={client.complement} />
                    </div>
                    <div className="form-group">
                        <label>Capital social:</label>
                        <input onChange={changeClient} className="form-control" type="text" name="joint_stock" value={client.joint_stock} />
                    </div>
                </div>
                <div>
                    <h3 className="text-center py-4">Atividades Secundárias</h3>
                    {client.secondary_activity.map((x)=>{
                        return(
                            <>
                            <div className="form-group">
                                <label>descrição:</label>
                                <input onChange={changeActivity} className="form-control" type="text" name="text" value={x.text} />
                            </div>
                            </>
                        )
                    })}
                </div>
                <div>
                    <h3 className="text-center py-4">Quadro Societário</h3>
                    {client.qsa.map((x)=>{
                        return(
                            <>
                            <div className="form-group">
                                <label>Tipo:</label>
                                <input className="form-control" type="text" name="text" value={x.qual} />
                            </div>
                            <div className="form-group">
                                <label>Nome:</label>
                                <input className="form-control" type="text" name="text" value={x.nome} />
                            </div>
                            </>
                        )
                    })}
                </div>
                <div className="button py-4">
                    <button className="btn btn-primary w-100">Cadastrar</button>
                </div>
            </form>
        </div>
    )
}