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
            {/* <table className='container'>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>DATA</td>
                        <td>NOME</td>
                        <td>EMAIL</td>
                        <td>ADMIN</td>
                        <td>AÇÕES</td>
                    </tr>
                </thead>
                <tbody>
                    {users.length !== 0 && users.map((x)=>{
                        return(
                            <tr key={x.id}>
                                <td> {x.id} </td>
                                <td> {x.date} </td>
                                <td> {x.nameUser} </td>
                                <td> {x.email} </td>
                                <td> {x.admin === "true"? "Sim": "Não"} </td>
                                <td>
                                    <button onClick={()=> editUser(x.id)} className="btn btn-primary">Editar</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table> */}
            <div className="row my-4 justify-content-center">
                {users.length !== 0 && users.map((x)=>{
                    return(
                        <div class="card text-center col-lg-4 col-sm-6 m-1 my-2">
                            <div class="card-header">
                                {x.id}
                            </div>
                            <div class="card-body">
                                <h5 class="card-title"> {x.nameUser} </h5>
                                <p class="card-text"> - Email: {x.email} </p>
                                <p class="card-text"> - Admin: {x.admin==="true"?"Sim":"Não"} </p>
                                <button type="button" onClick={()=>editUser(x.id)} class="btn btn-primary">Editar</button>
                            </div>
                            <div class="card-footer text-muted">
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