import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/header'
import { validateUserLogin } from '../validation/validateUserLogin'

export default function Login(){
    const [user, setUser] = useState({email:"",password:""})
    const [message, setMessage] = useState("")
    const navigate = useNavigate()

    const changeUser = ({target})=>{
        setUser((state)=>{
            return {...state,[target.name]: target.value}
        })
    }

    const sendUser = async ()=>{
        axios.post(`http://localhost:3001/auth`,user)
            .then((x)=>{
                console.log('data:',x.data)
                localStorage.setItem('token',x.data)
            })
            .catch((error)=>{
                setMessage(error)
                console.log(error)
            })
    }

    const loginUser = async (event)=>{
        event.preventDefault()

        validateUserLogin(user).then(async()=>{
            await sendUser()
            setMessage("Logado! Aguarde um momento")

            setTimeout(()=>{
                navigate("/search")
            },3000)
        }).catch((error)=>{
            setMessage(error)
        })

    }

    return(
        <>
        <div className="form-style d-flex">
            <form onSubmit={loginUser} className="mx-auto">
                <h3 className="text-center">Login</h3>
                {JSON.stringify(user)}
                <input onChange={changeUser} className="form-control" type='text' name='email' placeholder="Digite o email" />
                <input onChange={changeUser} className="form-control" type='text' name='password' placeholder="Digite a senha" />
                <button type='submit' className="btn btn-primary w-100">Logar</button>
                <div className="text-center">
                    <span> {message} </span>
                </div>
            </form>
        </div>
        </>
    )
}