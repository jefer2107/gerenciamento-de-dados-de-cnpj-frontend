import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../components/header'
import jwtDecoded from "jwt-decode"

export default function UserList(){
    const [users, setUsers] = useState([])
    const [message, setMessage] = useState("")
    const [menu, setMenu] = useState(false)
    const navigate = useNavigate()
    let {id} = useParams()
    const token = localStorage.getItem('token')
    const decoded = jwtDecoded(token !== null && token)

    useEffect(()=>{
        axios.get(`http://localhost:3001/users/getAll`)
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
        console.log("Fui chamado")
        navigate(`/user-edit/${id}`)
    }

    return(
        <>
        <Header menu={menu}/>
        <div className="list container-fluid">
            <h3 className="text-center">Lista de Usuários</h3>
            <table className='container'>
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
            </table>
            <div className='text-center'>
                <span className='text-danger'> {message} </span>
            </div>
        </div>
        </>
    )
}