import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/header'

export default function Login(){
    const [user, setUser] = useState({email:"",password:""})
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
                console.log(error)
            })
    }

    const loginUser = async (event)=>{
        await sendUser()

        //navigate("/search")

        event.preventDefault()
    }

    return(
        <>
        <Header/>
        <div className="form-style d-flex">
            <form onSubmit={loginUser} className="mx-auto">
                <h3 className="text-center">Login</h3>
                {JSON.stringify(user)}
                <input onChange={changeUser} className="form-control" type='email' name='email' placeholder="Digite o email" />
                <input onChange={changeUser} className="form-control" type='text' name='password' placeholder="Digite a senha" />
                <button type='submit' className="btn btn-primary w-100">Cadastrar</button>
            </form>
        </div>
        </>
    )
}