import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Header from '../components/header'
import jwtDecoded from "jwt-decode"


export default function ClientData(){
    const [clients, setClients] = useState({
        id:'',
        date:'',
        user:'',
        date_situation:'',
        type:'',
        name:'',
        sth:'',
        telephone:'',
        email:'',
        secondary_activity:[],
        qsa:[],
        situation:'',
        district:'',
        address:'',
        number:'',
        zip_code:'',
        city:'',
        company_size:'',
        opening:'',
        legal_nature:'',
        fantasy:'',
        cnpj:'',
        status:'',
        complement:'',
        joint_stock:''
    })
    let {id} = useParams()
    const token = localStorage.getItem('token')
    const decoded = jwtDecoded(token !== null && token)
    const [menu, setMenu] = useState(false)

    useEffect(()=>{
        setMenu(decoded.admin==="true" && true)
    },[])

    useEffect(()=>{
        console.log('id:',id)
        axios.get(`http://localhost:3001/clients/${id}/${decoded.id}/getOne`,{header:{'Authorization':`Bearer ${token}`}})
            .then((x)=>{
                setClients(()=>x.data)
            })
            .catch((error)=>{
                console.log(error)
            })

            console.log('Filho renderizou')

    },[id])

    return(
        <>
        <Header menu={menu}/>
        <div className="list">
            {JSON.stringify(clients)}
            {JSON.stringify(decoded)}
            {clients.id === ""? <h3 className="text-center">Não foi encontrado dados com este CNPJ</h3>:
            <>
                <h3 className="text-center"> {clients.name !== "" && clients.name} </h3>
                <h3 className="text-center">Dados Cadastrais</h3>
                <table>
                    <thead>
                        <tr key={clients.id}>
                            <td>ID</td>
                            <td>DATA</td>
                            <td>DATA CRIAÇÃO</td>
                            <td>TIPO</td>
                            <td>NOME</td>
                            <td>ESTADO</td>
                            <td>TELEFONE</td>
                            <td>EMAIL</td>
                            <td>SITUAÇÃO</td>
                            <td>BAIRRO</td>
                            <td>LOGRADOURO</td>
                            <td>NÚMERO</td>
                            <td>CEP</td>
                            <td>CIDADE</td>
                            <td>PORTE</td>
                            <td>ABERTURA</td>
                            <td>NATUREZA LEGAL</td>
                            <td>NOME FANTASIA</td>
                            <td>STATUS</td>
                            <td>COMPLEMENTO</td>
                            <td>CAPITAL SOCIAL</td>
                            <td>USUÁRIO</td>
                            <td>AÇÕES</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td> {clients.id !== "" && clients.id} </td>
                            <td> {clients.id !== "" && clients.date} </td>
                            <td> {clients.id !== "" && clients.date_situation} </td>
                            <td> {clients.id !== "" && clients.type} </td>
                            <td> {clients.id !== "" && clients.name} </td>
                            <td> {clients.id !== "" && clients.sth} </td>
                            <td> {clients.id !== "" && clients.telephone} </td>
                            <td> {clients.id !== "" && clients.email} </td>
                            <td> {clients.id !== "" && clients.situation} </td>
                            <td> {clients.id !== "" && clients.district} </td>
                            <td> {clients.id !== "" && clients.address} </td>
                            <td> {clients.id !== "" && clients.number} </td>
                            <td> {clients.id !== "" && clients.zip_code} </td>
                            <td> {clients.id !== "" && clients.city} </td>
                            <td> {clients.id !== "" && clients.company_size} </td>
                            <td> {clients.id !== "" && clients.opening} </td>
                            <td> {clients.id !== "" && clients.legal_nature} </td>
                            <td> {clients.id !== "" && clients.fantasy} </td>
                            <td> {clients.id !== "" && clients.status} </td>
                            <td> {clients.id !== "" && clients.complement} </td>
                            <td> {clients.id !== "" && clients.joint_stock} </td>
                            <td> {clients.id !== "" && clients.user} </td>
                        </tr>
                    </tbody>
                </table>
                <h3 className="text-center">Atividades Secundárias</h3>
                <table>
                    <thead>
                        <tr>
                            <td>DESCRIÇÃO</td>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.secondary_activity.length !== 0 && clients.secondary_activity.map((x)=>{
                            return(
                                <tr>
                                    <td> {x.text} </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <h3 className="text-center">Quadro Societário</h3>
                <table>
                    <thead>
                        <tr>
                            <td>TIPO</td>
                            <td>NOME</td>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.qsa.length !== 0 && clients.qsa.map((x)=>{
                            return(
                                <tr>
                                    <td> {x.qual} </td>
                                    <td> {x.nome} </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                </>
            }
            
        </div>
        </>
    )
}