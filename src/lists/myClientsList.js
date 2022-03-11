import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import Header from '../components/header'
import jwtDecoded from "jwt-decode"
import moment from 'moment'

export default function MyClientsLists(){
    const [clients, setClients] = useState([])
    const [message, setMessage] = useState()
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const decoded = jwtDecoded(token !== null && token)
    const [menu, setMenu] = useState(false)

    useEffect(()=>{
        setMenu(decoded.admin==="true" && true)
    },[])

    const moreDetails = (id)=>{
        navigate(`/client-data/${id}`)
    }

    const removeClient = (id)=>{
        axios.delete(`http://localhost:3001/clients/${id}/removeItem`)
            .then(()=>{
                setClients((state)=>{
                    const newClients = [...state]
                    const itemToBeRemove = clients.findIndex(e=> e.id === id)
        
                    newClients.splice(itemToBeRemove, 1)
        
                    return newClients
                })
            })
            .catch((error)=>{
                setMessage(error)
            })
        
    }

    useEffect(()=>{
        axios.get(`http://localhost:3001/clients/${decoded.id}/getOneJoinClientAndUsers`,{headers:{'Authorization':`Bearer ${token}`}})
            .then((x)=>{
                setClients(x.data)
                setMessage(x.data.length === 0 && "Ainda não tem clientes cadastrados")
            })
            .catch((error)=>{
                console.log(error)
            })
    },[])

    return(
        <>
        <Header menu={menu}/>
        <div className="list client-list my-4 container-fluid">
            <h3 className="text-center">Meus Clientes</h3>
            <div className="row my-4 justify-content-center">
                {clients.length !== 0 && clients.map((x)=>{
                    return(
                        <div className="card text-center col-lg-4 col-sm-6 m-1 my-2">
                            <div className="card-header">
                                {x.id}
                            </div>
                            <div className="card-body">
                                <h5 className="card-title"> {x.fantasy} </h5>
                                <p className="card-text"> - Nome: {x.name} </p>
                                <p className="card-text"> - Status: {x.status} </p>
                                <p className="card-text"> - Usuário: {x.nameUser} </p>
                                <button type="button" onClick={()=>moreDetails(x.id)} class="btn btn-primary m-1">Mais detalhes</button>
                                <button onClick={()=>removeClient(x.id)} type="button" className="btn btn-danger m-1">Excluir</button>
                            </div>
                            <div className="card-footer text-muted">
                                {moment(x.date).format("DD/MM/YYYY")}
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className='text-center'>
                <span className='text-danger'> {message} </span>
            </div>
        </div>
        </>
    )
}