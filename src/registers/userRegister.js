import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/header'
import { validateUserRegister } from '../validation/validateUserRegister'
import jwtDecoded from "jwt-decode"

export default function UserRegister(){
    const [user, setUser] = useState({nameUser:'',email:'',admin:'',password:''})
    const [message, setMessage] = useState("")
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const decoded = jwtDecoded(token !== null && token)
    const [menu, setMenu] = useState(false)

    useEffect(()=>{
        setMenu(decoded.admin==="true" && true)
    },[])

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
            await axios.post(`http://localhost:3001/users/create`,user)

        } catch (error) {
            setMessage(error)
        }
        
    }

    const registerUser = (event)=>{

        validateUserRegister(user).then(async()=>{
            await sendUser()
            navigate("/user-list")

        }).catch((error)=>{
            setMessage(error)
            setTimeout(()=>{
                setMessage("")
            },7000)
            console.log(error)
        })
        
        event.preventDefault()
    }

    return(
        <>
        <Header menu={menu}/>
        <div className="form-style d-flex my-4">
            <form onSubmit={registerUser} className="mx-auto my-4 py-2">
                <h3 className="text-center">Cadastrar usuário</h3>
                <input onChange={changeUser} className="form-control" type='text' name='nameUser' placeholder="Digite o nome" />
                <input onChange={changeUser} className="form-control" type='email' name='email' placeholder="Digite o email" />
                <div class="form-check">
                    <input onChange={changeUser} className="form-check-input" type="radio" name="admin" id="flexRadioDefault1"/>
                    <label className="form-check-label" for="flexRadioDefault1">
                        Usuário
                    </label>
                </div>
                <div class="form-check">
                    <input onChange={changeUser}  className="form-check-input" type="radio" name="admin" id="flexRadioDefault2" />
                    <label className="form-check-label" for="flexRadioDefault2">
                        Administrador
                    </label>
                </div>
                <input onChange={changeUser} className="form-control" type='password' name='password' placeholder="Digite a senha" />
                <button type='submit' className="btn btn-success w-100 my-2">Cadastrar</button>
                <div className="text-center text-danger">
                    <span> {message} </span>
                </div>
            </form>
        </div>
        </>
    )
}