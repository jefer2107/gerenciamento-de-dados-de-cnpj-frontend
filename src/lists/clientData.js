import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Header from '../components/header'
import jwtDecoded from "jwt-decode"
import moment from "moment"


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
        axios.get(`http://localhost:3001/clients/${id}/${decoded.id}/getOne`,{headers:{'Authorization':`Bearer ${token}`}})
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
        <div className="list client-data container-fluid my-4">
            {clients.id === ""? <h3 className="text-center">Não foi encontrado dados com este CNPJ</h3>:
            <>
                <h3 className="text-center"> {clients.name !== "" && clients.name} </h3>
                <h3 className="text-center">Dados Cadastrais</h3>
                <div className="row">
                    <div class="card col-lg-6">
                        <div class="card-body">
                            <table className="container-fluid">
                                <thead className="text-center">
                                    <tr>
                                        <td>ID</td>
                                        <td>DATA</td>
                                        <td>DATA CRIAÇÃO</td>
                                        <td>TIPO</td>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    <tr>
                                        <td>{clients.id !== "" && clients.id}</td>
                                        <td>{clients.id !== "" && moment(clients.date).format("DD/MM/YY")}</td>
                                        <td>{clients.id !== "" && clients.date_situation}</td>
                                        <td>{clients.id !== "" && clients.type}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="card col-lg-6">
                        <div class="card-body">
                            <table className="container-fluid">
                                <thead className="text-center">
                                    <tr>
                                        <td>NOME</td>
                                        <td>ESTADO</td>
                                        <td>TELEFONE</td>
                                        <td>EMAIL</td>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    <tr>
                                        <td>{clients.id !== "" && clients.name}</td>
                                        <td>{clients.id !== "" && clients.sth}</td>
                                        <td>{clients.id !== "" && clients.telephone}</td>
                                        <td>{clients.id !== "" && clients.email}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div class="card col-lg-6">
                        <div class="card-body">
                            <table className="container-fluid">
                                <thead className="text-center">
                                    <tr>
                                        <td>SITUAÇÃO</td>
                                        <td>BAIRRO</td>
                                        <td>LOGRADOURO</td>
                                        <td>NÚMERO</td>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    <tr>
                                        <td>{clients.id !== "" && clients.situation}</td>
                                        <td>{clients.id !== "" && clients.district}</td>
                                        <td>{clients.id !== "" && clients.address}</td>
                                        <td>{clients.id !== "" && clients.number}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="card col-lg-6">
                        <div class="card-body">
                            <table className="container-fluid">
                                <thead className="text-center">
                                    <tr>
                                        <td>CEP</td>
                                        <td>CIDADE</td>
                                        <td>PORTE</td>
                                        <td>ABERTURA</td>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    <tr>
                                        <td>{clients.id !== "" && clients.zip_code}</td>
                                        <td>{clients.id !== "" && clients.city}</td>
                                        <td>{clients.id !== "" && clients.company_size}</td>
                                        <td>{clients.id !== "" && clients.opening}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div class="card col-lg-6">
                        <div class="card-body">
                            <table className="container-fluid">
                                <thead className="text-center">
                                    <tr>
                                        <td>NATUREZA LEGAL</td>
                                        <td>NOME FANTASIA</td>
                                        <td>STATUS</td>
                                        <td>COMPLEMENTO</td>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    <tr>
                                        <td>{clients.id !== "" && clients.legal_nature}</td>
                                        <td>{clients.id !== "" && clients.fantasy}</td>
                                        <td>{clients.id !== "" && clients.status}</td>
                                        <td>{clients.id !== "" && clients.complement}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="card col-lg-6">
                        <div class="card-body">
                            <table className="container-fluid">
                                <thead className="text-center">
                                    <tr>
                                        <td>CAPITAL SOCIAL</td>
                                        <td>USUÁRIO</td>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    <tr>
                                        <td>{clients.id !== "" && clients.joint_stock}</td>
                                        <td>{clients.id !== "" && clients.user}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <h3 className="text-center my-4">Atividades Secundárias</h3>
                <table className="container">
                    <thead className="text-center">
                        <tr>
                            <td>DESCRIÇÃO</td>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {clients.secondary_activity.length !== 0 && clients.secondary_activity.map((x)=>{
                            return(
                                <tr>
                                    <td> {x.text} </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <h3 className="text-center my-4">Quadro Societário</h3>
                <table className="container">
                    <thead className="text-center">
                        <tr>
                            <td>TIPO</td>
                            <td>NOME</td>
                        </tr>
                    </thead>
                    <tbody className="text-center">
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