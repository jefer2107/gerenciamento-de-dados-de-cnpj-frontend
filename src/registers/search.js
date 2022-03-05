import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from '../components/header'
import jwtDecoded from "jwt-decode"

export default function Search(){

    const [numberCNPJ, setNumberCNPJ] = useState("")
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const decoded = jwtDecoded(token !== null && token)
    const [message, setMessage] = useState("")
    const [menu, setMenu] = useState(false)

    const changeNumberCNPJ = ({target})=>{
        setNumberCNPJ(()=>{
            return {[target.name]: target.value}
        })
    }

    useEffect(()=>{
        setMenu(decoded.admin==="true" && true)
    },[])

    const validateCnpj = (cnpj)=>{
        const characters = [".","/"]
        return new Promise((res,rej)=>{
            if(!cnpj || cnpj === "") return rej("Precisa preencher o campo primeiro")

            characters.forEach((x)=>{if(cnpj.includes(x)) return rej("O cnpj não pode conter caracteres")})

            return res()
        })
        
    }

    const redirectToCnpj = (event)=>{
        validateCnpj(numberCNPJ.cnpj).then(()=>{
            navigate(`/client-data/${numberCNPJ.cnpj}`)

        }).catch((error)=>{
            setMessage(error)
        })

        event.preventDefault()
        
    }

    return(
        <>
        <Header menu={menu}/>
        <div className="form-style">
            <form onSubmit={redirectToCnpj} className="mx-auto">
                <h3 className="text-center">Consultar CNPJ</h3>
                <h4 className="text-center"> Olá, {decoded.nameUser} </h4>
                {JSON.stringify(decoded)}
                <input onChange={changeNumberCNPJ} className="form-control" name="cnpj" />
                <button type="submit" className="btn btn-primary">Enviar</button>
                <div className="text-center">
                    <span> {message} </span>
                </div>
            </form>
        </div>
        </>
    )
}