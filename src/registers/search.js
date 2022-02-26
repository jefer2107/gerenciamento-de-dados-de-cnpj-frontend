import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Search(){

    const [numberCNPJ, setNumberCNPJ] = useState("")
    const navigate = useNavigate()
    const changeNumberCNPJ = ({target})=>{
        setNumberCNPJ(()=>{
            return {[target.name]: target.value}
        })
    }

    const sendCNPJ = ()=>{
        navigate(`/client-register/${numberCNPJ.cnpj}`)
    }

    return(
        <div className="form-style">
            <form onSubmit={sendCNPJ} className="mx-auto">
                <h3 className="text-center">Cadastrar CNPJ</h3>
                <input onChange={changeNumberCNPJ} className="form-control" name="cnpj" />
                <button type="submit" className="btn btn-primary">Enviar</button>
            </form>
        </div>
    )
}