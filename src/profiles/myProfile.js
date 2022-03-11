import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/header'
import jwtDecoded from "jwt-decode"
import axios from 'axios'
import { validateMyProfile } from '../validation/validateMyProfile'

export default function MyProfile(){
    const [user, setUser] = useState({nameUser:"",email:""})
    const [btnEdit, setBtnEdit] = useState(false)
    const token = localStorage.getItem('token')
    const decoded = jwtDecoded(token !== null && token)
    const [menu, setMenu] = useState(false)
    const [message, setMessage] = useState("")

    const changeUser = ({target})=>{
        setUser((state)=>{
            return {...state,[target.name]: target.value}
        })
    }

    useEffect(()=>{
        setMenu(decoded.admin==="true" && true)
    },[])

    useEffect(()=>{
        axios.get(`http://localhost:3001/users/${decoded.id}/getOne`)
            .then((x)=>{
                setUser(x.data)
            })
            .catch((error)=>{
                console.log(error)
            })
    },[])

    const sendUser = async ()=>{

        try {
            await axios.put(`http://localhost:3001/users/${decoded.id}/changeItem`,user)

        } catch (error) {
            setMessage(error)

        }
    }

    const saveUser = (event)=>{
        
        validateMyProfile(user,decoded.id).then(async()=>{
            await sendUser()
            setBtnEdit(false)
            
        }).catch((error)=>{
            setMessage(error)
            setTimeout(()=>{
                setMessage("")
            },7000)
        })

        event.preventDefault()
    }

    const cancelEdit = ()=>{
        setBtnEdit(false)
    }

    const editUser = ()=>{
        setBtnEdit(true)
    }

    return(
        <>
        <Header menu={menu}/>
        <div className="form-style my-4">
            <form onSubmit={btnEdit===true?saveUser:undefined} className="mx-auto my-4">
                <h3 className="text-center py-2">{btnEdit===true?"Editar Perfil":"Meu perfil"}</h3>
                <div className="form-group">
                    <label>Nome:</label>
                    <input onChange={btnEdit===true?changeUser:undefined} disabled={!btnEdit} className="form-control" type="text" name="nameUser" value={user.nameUser} />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input onChange={btnEdit===true?changeUser:undefined} disabled={!btnEdit} className="form-control" type="email" name="email" value={user.email} />
                </div>
                <div className="form-group">
                    <label>Sou:</label>
                    <input className="form-control" disabled type="text" value={user.admin==="true"?"Administrador":"Usuário"} />
                </div>
                {btnEdit === true?
                <>
                <div className='py-2'>
                    <button type="submit" className="btn btn-primary w-100 p-2">Salvar</button>
                </div>
                <div className="py-2">
                    <button onClick={()=> cancelEdit()} type="button" className="btn btn-outline-secondary w-100 p-2">Cancelar</button>
                </div>
                </>
                :
                <div className='py-1'>
                    <button type='button' onClick={()=> editUser()} className='btn btn-primary w-100'>Editar Perfil</button>
                </div>
                }
                <div className="text-center text-danger">
                    <span> {message} </span>
                </div>
            </form>
        </div>
        </>
    )
}