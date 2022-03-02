import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../components/header'

export default function UserList(){
    const [users, setUsers] = useState([])
    const navigate = useNavigate()
    let {id} = useParams()

    useEffect(()=>{
        axios.get(`http://localhost:3001/users/getAll`)
            .then((x)=>{
                setUsers(x.data)
            })
            .catch((error)=>{
                console.log(error)
            })
    },[id])

    const removeUser = (id)=>{
        axios.delete(`http://localhost:3001/users/${id}/removeItem`)
            .then(()=>{
                setUsers((state)=>{
                    const newList = [...state]
                    const itemToBeRemove = users.findIndex(e=> e.id == id)

                    newList.splice(itemToBeRemove, 1)

                    return newList
                })
            })
            .catch((error)=>{
                console.log(error)
            })
    }

    const editUser = (id)=>{
        console.log("Fui chamado")
        navigate(`/user-edit/${id}`)
    }

    return(
        <>
        <Header />
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
                                <td> {x.admin} </td>
                                <td>
                                    <button onClick={()=> editUser(x.id)} className="btn btn-primary">Editar</button>
                                    <button onClick={()=> removeUser(x.id)} className="btn btn-danger">Remover</button>
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