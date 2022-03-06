import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../components/header'
import jwtDecoded from "jwt-decode"
import moment from 'moment'

export default function UserList(){
    const [users, setUsers] = useState([])
    const [message, setMessage] = useState("")
    const [menu, setMenu] = useState(false)
    const navigate = useNavigate()
    let {id} = useParams()
    const token = localStorage.getItem('token')
    const decoded = jwtDecoded(token !== null && token)

    useEffect(()=>{
        axios.get(`http://localhost:3001/users/getAll`,{headers:{'Authorization':`Bearer ${token}`}})
            .then((x)=>{
                setUsers(x.data)
                setMessage(x.data.length === 0 && "Lista vazia")
            })
            .catch((error)=>{
                console.log(error)
            })
    },[id])

    useEffect(()=>{
        setMenu(decoded.admin==="true" && true)
    },[])

    const editUser = (id)=>{
        navigate(`/user-edit/${id}`)
    }

    return(
        <>
        <Header menu={menu}/>
        <div className="list client-list container-fluid my-4">
            <h3 className="text-center">Lista de Usuários</h3>
            <div className="row my-4 justify-content-center">
                {users.length !== 0 && users.map((x)=>{
                    return(
                        <div className="card text-center col-lg-4 col-sm-6 m-1 my-2">
                            <div className="card-header">
                                {x.id}
                            </div>
                            <div className="card-body">
                                <h5 className="card-title"> {x.nameUser} </h5>
                                <p className="card-text"> - Email: {x.email} </p>
                                <p className="card-text"> - Admin: {x.admin==="true"?"Sim":"Não"} </p>
                                <button type="button" onClick={()=>editUser(x.id)} class="btn btn-primary">Editar</button>
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