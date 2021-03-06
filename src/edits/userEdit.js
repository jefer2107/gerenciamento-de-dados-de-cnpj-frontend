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
            setTimeout(()=>{
                setMessage("")
            },7000)
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
        <div className="form-style my-4">
            <form onSubmit={saveUser} className="mx-auto my-4 py-2">
                <h3 className="text-center">Editar Usu??rio</h3>
                <div className="form-group">
                    <label>Nome:</label>
                    <input disabled className="form-control" type="text" name="nameUser" value={user.nameUser} />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input disabled className="form-control" type="email" name="email" value={user.email} />
                </div>
                <div className="form-group">
                    <label>Adimistrador:</label>
                    <input disabled className="form-control" type="email" name="email" value={user.admin === "true"? "Sim": "N??o"} />
                </div>
                <div className="form-check">
                    <input onChange={changeUser} className="form-check-input" type="radio" name="admin" id="flexRadioDefault1"/>
                    <label className="form-check-label" for="flexRadioDefault1">
                        Usu??rio
                    </label>
                </div>
                <div className="form-check">
                    <input onChange={changeUser} className="form-check-input" type="radio" name="admin" id="flexRadioDefault2"/>
                    <label className="form-check-label" for="flexRadioDefault2">
                        Administrador
                    </label>
                </div>
                <div className='py-2'>
                    <button type="submit" className="btn btn-primary w-100 p-2">Salvar</button>
                </div>
                <div className="py-2">
                    <button onClick={()=> cancelEdit()} type="button" className="btn btn-outline-secondary w-100 p-2">Cancelar</button>
                </div>
                <div className="text-center text-danger">
                    <span> {message} </span>
                </div>
            </form>
        </div>
        </>
    )
}