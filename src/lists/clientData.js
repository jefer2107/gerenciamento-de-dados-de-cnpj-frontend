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

    useEffect(()=>{
        console.log('id:',id)
        axios.get(`http://localhost:3001/clients/${id}/${decoded.id}/getOne`)
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
        <Header />
        <div className="list">
            {JSON.stringify(clients)}
            {JSON.stringify(decoded)}
            {console.log('Pai redenrizou')}
            <h3 className="text-center"> {clients !== {} && clients.name} </h3>
            <h3 className="text-center">Dados Cadastrais</h3>
            <table>
                <thead>
                    <tr>
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
                        <td> {clients !== {} && clients.id} </td>
                        <td> {clients !== {} && clients.date} </td>
                        <td> {clients !== {} && clients.date_situation} </td>
                        <td> {clients !== {} && clients.type} </td>
                        <td> {clients !== {} && clients.name} </td>
                        <td> {clients !== {} && clients.sth} </td>
                        <td> {clients !== {} && clients.telephone} </td>
                        <td> {clients !== {} && clients.email} </td>
                        <td> {clients !== {} && clients.situation} </td>
                        <td> {clients !== {} && clients.district} </td>
                        <td> {clients !== {} && clients.address} </td>
                        <td> {clients !== {} && clients.number} </td>
                        <td> {clients !== {} && clients.zip_code} </td>
                        <td> {clients !== {} && clients.city} </td>
                        <td> {clients !== {} && clients.company_size} </td>
                        <td> {clients !== {} && clients.opening} </td>
                        <td> {clients !== {} && clients.legal_nature} </td>
                        <td> {clients !== {} && clients.fantasy} </td>
                        <td> {clients !== {} && clients.status} </td>
                        <td> {clients !== {} && clients.complement} </td>
                        <td> {clients !== {} && clients.joint_stock} </td>
                        <td> {clients !== {} && clients.user} </td>
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
        </div>
        </>
    )
}