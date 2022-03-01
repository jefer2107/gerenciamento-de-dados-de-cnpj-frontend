import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/header'

export default function UserList(){
    const [users, setUsers] = useState([])
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
                                <td> {x.name} </td>
                                <td> {x.email} </td>
                                <td> {x.admin} </td>
                                <td>
                                    <button className="btn btn-primary">Editar</button>
                                    <button className="btn btn-danger">Remover</button>
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