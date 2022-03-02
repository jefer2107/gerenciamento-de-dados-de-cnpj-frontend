import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/header'

export default function UserRegister(){
    const [user, setUser] = useState({name:'',email:'',admin:'',password:''})
    const navigate = useNavigate()

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

    const registerUser = (event)=>{
        axios.post(`http://localhost:3001/users/create`,user)
            .then((x)=>{
                navigate("/user-list")
            })
            .catch((error)=>{
                console.log(error)
            })

        event.preventDefault()
    }

    return(
        <>
        <Header />
        <div className="form-style d-flex">
            <form onSubmit={registerUser} className="mx-auto">
                <h3 className="text-center">Cadastro de usuários</h3>
                {JSON.stringify(user)}
                {console.log(user)}
                <input onChange={changeUser} className="form-control" type='text' name='nameUser' placeholder="Digite o nome" />
                <input onChange={changeUser} className="form-control" type='email' name='email' placeholder="Digite o email" />
                <div class="form-check">
                    <input onChange={changeUser} className="form-check-input" type="radio" name="admin" id="flexRadioDefault1" />
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
                <input onChange={changeUser} className="form-control" type='text' name='password' placeholder="Digite a senha" />
                <button type='submit' className="btn btn-success w-100">Cadastrar</button>
                
            </form>
        </div>
        </>
    )
}