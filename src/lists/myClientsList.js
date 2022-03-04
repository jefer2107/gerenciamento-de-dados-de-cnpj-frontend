import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import Header from '../components/header'
import jwtDecoded from "jwt-decode"

export default function MyClientsLists(){
    const [clients, setClients] = useState([])
    const [message, setMessage] = useState()
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const decoded = jwtDecoded(token !== null && token)


    const moreDetails = (id)=>{
        navigate(`/client-data/${id}`)
    }

    const removeClient = (id)=>{
        setClients((state)=>{
            const newClients = [...state]
            const itemToBeRemove = clients.findIndex(e=> e.id === id)

            newClients.splice(itemToBeRemove, 1)

            return newClients
        })
    }

    useEffect(()=>{
        axios.get(`http://localhost:3001/list_clients/${decoded.id}/getOneJoinClientsAndUsers`)
            .then((x)=>{
                setClients(x.data)
                setMessage(()=>{
                    if(x.data.length === 0) return "Você ainda não tem clientes cadastrados!!!"
                })
            })
            .catch((error)=>{
                console.log(error)
            })
    },[])

   

    return(
        <>
        <Header />
        <div className="list container-fluid">
            <h3 className="text-center">Meus Clientes</h3>
            {JSON.stringify(clients)}
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
                            <tr key={x.id}>
                                <td> {x.id} </td>
                                <td> {x.date} </td>
                                <td> {x.name} </td>
                                <td> {x.fantasy} </td>
                                <td> {x.status} </td>
                                <td> {x.nameUser} </td>
                                <td> 
                                    <button onClick={()=>moreDetails(x.id)} type="butto" className="btn btn-primary">Mais detalhes</button> 
                                    <button onClick={()=>removeClient(x.id)} type="butto" className="btn btn-danger">Excluir</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className='text-center'>
                <span className='text-danger'> {message} </span>
            </div>
        </div>
        </>
    )
}