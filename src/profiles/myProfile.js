import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/header'
import jwtDecoded from "jwt-decode"
import axios from 'axios'

export default function MyProfile(){
    const [user, setUser] = useState({nameUser:"",email:""})
    const [btnEdit, setBtnEdit] = useState(false)
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const decoded = jwtDecoded(token !== null && token)

    const changeUser = ({target})=>{
        setUser((state)=>{
            return {...state,[target.name]: target.value}
        })
    }

    useEffect(()=>{
        axios.get(`http://localhost:3001/users/${decoded.id}/getOne`)
            .then((x)=>{
                setUser(x.data)
            })
            .catch((error)=>{
                console.log(error)
            })
    },[])

    const saveUser = (event)=>{
        event.preventDefault()
        axios.put(`http://localhost:3001/users/${decoded.id}/changeItem`,user)
            .then(()=>{
                navigate("/user-profile")
                setBtnEdit(false)
            })
            .catch((error)=>{
                console.log(error)
                navigate("/user-profile")
            })

    }

    const cancelEdit = ()=>{
        setBtnEdit(false)
    }

    const editUser = ()=>{
        setBtnEdit(true)
    }

    return(
        <>
        <Header />
        <div className="d-flex form-style">
            <form onSubmit={btnEdit===true?saveUser:false} className="mx-auto">
                <h3 className="text-center">{btnEdit===true?"Editar Perfil":"Meu perfil"}</h3>
                {JSON.stringify(user)}
                {JSON.stringify(btnEdit)}
                <div className="form-group">
                    <label>Nome:</label>
                    <input onChange={btnEdit===true?changeUser:false} className="form-control" type="text" name="nameUser" value={user.nameUser} />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input onChange={btnEdit===true?changeUser:false} className="form-control" type="email" name="email" value={user.email} />
                </div>
                <div className="form-group">
                    <label>Sou:</label>
                    <input className="form-control" type="text" value={user.admin==="true"?"Administrador":"Usuário"} />
                </div>
                {btnEdit === true?
                <>
                <div>
                    <button type="submit" className="tn btn-primary w-100 p-2">Salvar</button>
                </div>
                <div className="py-2">
                    <button onClick={()=> cancelEdit()} type="button" className="tn btn-danger w-100 p-2">Cancelar</button>
                </div>
                </>
                :
                <div className='py-2'>
                    <button type='button' onClick={()=> editUser()} className='btn btn-primary w-100'>Editar Perfil</button>
                </div>
                }
            </form>
        </div>
        </>
    )
}