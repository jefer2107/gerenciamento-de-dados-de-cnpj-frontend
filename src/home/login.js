import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/header'
import { validateUserLogin } from '../validation/validateUserLogin'

export default function Login(){
    const [user, setUser] = useState({email:"",password:""})
    const [message, setMessage] = useState("Mensagem")
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
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email</label>
                    <input onChange={changeUser} className="form-control" type='text' name='email'/>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Senha</label>
                    <input onChange={changeUser} className="form-control" type='text' name='password' />
                </div>
                <button type="submit" className="btn btn-primary w-100">Logar</button>
                <div className="text-center text-danger">
                    <span> {message} </span>
                </div>
            </form>
        </div>
        </>
    )
}