import axios from 'axios'
import { useState } from 'react'
import Header from '../components/header'

export default function UserRegister(){
    const [user, setUser] = useState({name:'',email:'',admin:'',password:''})
    //const [admin, setAdmin] = useState({name:'',email:'',admin1:'',admin2:'',password:''})

    const changeUser = ({target})=>{
        setUser((state)=>{
            if(target.name === "admin"){
                
                if(target.checked){
                    return {...state,[target.name]: "true"}
                }else{
                    return {...state,[target.name]: "false"}
                }

            }else{
                return {...state,[target.name]: target.value}
            }
        })
    }

    const registerUser = (event)=>{
        axios.post(`http://localhost:3001/users/create`,user)
            .then((x)=>{
                console.log('cadastrou')
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
                <input onChange={changeUser} className="form-control" type='text' name='name' placeholder="Digite o nome" />
                <input onChange={changeUser} className="form-control" type='email' name='email' placeholder="Digite o email" />
                <div class="form-check">
                    <input onChange={changeUser} className="form-check-input" type="radio" name="admin" id="flexRadioDefault1" checked/>
                    <label className="form-check-label" for="flexRadioDefault1">
                        Usuário
                    </label>
                </div>
                <div class="form-check">
                    <input onChange={changeUser}  className="form-check-input" type="radio" name="admin" id="flexRadioDefault2"/>
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