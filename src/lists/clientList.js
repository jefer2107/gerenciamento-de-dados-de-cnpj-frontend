import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from '../components/header'
import jwtDecoded from "jwt-decode"

export default function ClientList(){
    const navigate = useNavigate()
    const [clients, setClients] = useState([])
    const [message, setMessage] = useState("")
    const token = localStorage.getItem('token')
    const decoded = jwtDecoded(token !== null && token)
    const [menu, setMenu] = useState(false)

    useEffect(()=>{
        setMenu(decoded.admin==="true" && true)
    },[])

    useEffect(()=>{
        console.log("Filho renderizou")
        axios.get(`http://localhost:3001/clients/getJoinClientsAndUsers`,{headers:{'Authorization':`Bearer ${token}`}})
            .then((x)=>{
                setClients(x.data)
                setMessage(x.data.length === 0 && "Lista vazia")
                
            })
            .catch((error)=>{
                console.log(error)
            })
    },[])

    const moreDetails = (id)=>{
        navigate(`/client-data/${id}`)
    }

    return(
        <>
        <Header menu={menu}/>
        <div className="list client-list container-fluid">
            <h3 className="text-center">Lista de Clientes</h3>
            
            {/* <table className="container text-center">
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>DATA</td>
                        <td>NOME</td>
                        <td>NOME FANTASIA</td>
                        <td>STATUS</td>
                        <td>USUÁRIO</td>
                        <td>AÇÕES</td>
                    </tr>
                </thead>
                <tbody>
                    {clients.length !== 0 && clients.map((x)=>{
                        return(
                            <tr>
                                <td> {x.id} </td>
                                <td> {x.date} </td>
                                <td> {x.name} </td>
                                <td> {x.fantasy} </td>
                                <td> {x.status} </td>
                                <td> {x.nameUser} </td>
                                <td> 
                                    <button onClick={()=>moreDetails(x.id)} type="butto" className="btn btn-primary">Mais detalhes</button> 
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table> */}
            <div className="row my-4 justify-content-center">
                {clients.length !== 0 && clients.map((x)=>{
                    return(
                        <div class="card text-center col-lg-4 col-sm-6 m-1 my-2">
                            <div class="card-header">
                                {x.id}
                            </div>
                            <div class="card-body">
                                <h5 class="card-title"> {x.fantasy} </h5>
                                <p class="card-text"> - Nome: {x.name} </p>
                                <p class="card-text"> - Status: {x.status} </p>
                                <p class="card-text"> - Usuário: {x.user} </p>
                                <button type="button" onClick={()=>moreDetails(x.id)} class="btn btn-primary">Mais detalhes</button>
                            </div>
                            <div class="card-footer text-muted">
                                2 days ago
                            </div>
                        </div>
                    )
                })}
            </div>
            
            
            <div className="text-center">
                <span> {message} </span>
            </div>
        </div>
        </>
    )
}