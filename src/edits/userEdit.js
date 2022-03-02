import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Header from '../components/header'


export default function UserEdit(){
    const [user, setUser] = useState({name:"", email:"", admin:""})
    const navigate = useNavigate()
    let {id} = useParams()

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
                if(target.checked === true){
                    return {...state,[target.name]:"true"}
                }else{
                    return {...state,[target.name]:"false"}
                }

            }else{
                return {...state,[target.name]: target.value}
            }

        })
    }

    const saveUser = (event)=>{
        axios.put(`http://localhost:3001/users/${id}/changeItem`,user)
            .then(()=>{
                navigate("/user-list")
            })
            .catch((error)=>{
                console.log(error)
            })

        event.preventDefault()
    }

    const cancelEdit = ()=>{
        navigate("/user-list")
    }

    return(
        <>
        <Header />
        <div className="d-flex form-style">
            <form onSubmit={saveUser} className="mx-auto">
                <h3 className="text-center">Editar Usuário</h3>
                {JSON.stringify(user)}
                <div className="form-group">
                    <label>Nome:</label>
                    <input onChange={changeUser} className="form-control" type="text" name="name" value={user.name} />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input onChange={changeUser} className="form-control" type="email" name="email" value={user.email} />
                </div>
                <div className="form-check">
                    <input onChange={changeUser} className="form-check-input" type="radio" name="admin" id="flexRadioDefault1" checked={user.admin==="true"?false:true}/>
                    <label className="form-check-label" for="flexRadioDefault1">
                        Usuário
                    </label>
                </div>
                <div className="form-check">
                    <input onChange={changeUser} className="form-check-input" type="radio" name="admin" id="flexRadioDefault2" checked={user.admin==="true"?true:false}/>
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
            </form>
        </div>
        </>
    )
}