import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from '../components/header'

export default function ClientList(){
    const navigate = useNavigate()
    const [clients, setClients] = useState([])

    useEffect(()=>{
        axios.get(`http://localhost:3001/list_clients/join/clients/idClient/users/idUser/getJoinClientsAndUsers`)
            .then((x)=>{
                setClients(x.data)
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
        <Header />
        <div className="list container-fluid">
            <h3 className="text-center">Lista de Clientes</h3>
            <table className="container text-center">
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
                                    <button onClick={()=>moreDetails(x.id)} type="butto" className="btn btn-danger">Excluir</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
        </>
    )
}