import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Header from '../components/header'
import jwtDecoded from "jwt-decode"
import { validateUserRegister } from "../validation/validateUserRegister"
import { validateUserEdit } from "../validation/validateUserEdit"


export default function UserEdit(){
    const [user, setUser] = useState({nameUser:"", email:"", admin:""})
    const [message, setMessage] = useState("")
    const navigate = useNavigate()
    let {id} = useParams()
    const token = localStorage.getItem('token')
    const decoded = jwtDecoded(token !== null && token)
    const [menu, setMenu] = useState(false)

    useEffect(()=>{
        setMenu(decoded.admin==="true" && true)
    },[])

    useEffect(()=>{
        axios.get(`http://localhost:3001/users/${id}/getOne`)
            .then((x)=>{
                setUser(x.data)
            })
            .catch((error)=>{
                console.log(error)
            })
    },[id])

    const changeUser = ({target})=>{
        setUser((state)=>{
            
            if(target.name === "admin"){
                if(target.checked && target.id === "flexRadioDefault1"){
                    return {...state,[target.name]: "false"}

                }else if(target.checked && target.id === "flexRadioDefault2"){
                    return {...state,[target.name]: "true"}
                }

            }else{
                return {...state,[target.name]: target.value}
            }

        })
    }

    const sendUser = async ()=>{

        try {
            await axios.put(`http://localhost:3001/users/${id}/changeItem`,user)

        } catch (error) {
            setMessage(error)
        }
        
    }

    const saveUser = async (event)=>{

        validateUserEdit(user).then(async()=>{
            await sendUser()
            navigate("/user-list")

        }).catch((error)=>{
            setMessage(error)
        })

        event.preventDefault()

    }

    const cancelEdit = ()=>{
        navigate("/user-list")
    }

    return(
        <>
        <Header menu={menu}/>
        <div className="d-flex form-style">
            <form onSubmit={saveUser} className="mx-auto">
                <h3 className="text-center">Editar Usuário</h3>
                {JSON.stringify(decoded)}
                <div className="form-group">
                    <label>Nome:</label>
                    {decoded.id !== id?<input className="form-control" type="text" name="nameUser" value={user.nameUser} />:
                    <input onChange={changeUser} className="form-control" type="text" name="nameUser" value={user.nameUser} />
                    }
                    
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    {decoded.id !== id?<input className="form-control" type="email" name="email" value={user.email} />:
                    <input onChange={changeUser} className="form-control" type="email" name="email" value={user.email} />
                    }
                </div>
                <div className="form-check">
                    <input onChange={changeUser} className="form-check-input" type="radio" name="admin" id="flexRadioDefault1" />
                    <label className="form-check-label" for="flexRadioDefault1">
                        Usuário
                    </label>
                </div>
                <div className="form-check">
                    <input onChange={changeUser} className="form-check-input" type="radio" name="admin" id="flexRadioDefault2" />
                    <label className="form-check-label" for="flexRadioDefault2">
                        Administrador
                    </label>
                </div>
                <div>
                    <button type="submit" className="tn btn-primary w-100 p-2">Salvar</button>
                </div>
                <div className="py-2">
                    <button onClick={()=> cancelEdit()} type="button" className="tn btn-danger w-100 p-2">Cancelar</button>
                </div>
                <div className="text-center">
                    <span> {message} </span>
                </div>
            </form>
        </div>
        </>
    )
}