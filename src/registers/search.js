import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from '../components/header'

export default function Search(){

    const [numberCNPJ, setNumberCNPJ] = useState("")
    const navigate = useNavigate()
    const changeNumberCNPJ = ({target})=>{
        setNumberCNPJ(()=>{
            return {[target.name]: target.value}
        })
    }

    const redirectToCnpj = ()=>{
        navigate(`/client-data/${numberCNPJ.cnpj}`)
    }

    return(
        <>
        <Header />
        <div className="form-style">
            <form onSubmit={redirectToCnpj} className="mx-auto">
                <h3 className="text-center">Consultar CNPJ</h3>
                <input onChange={changeNumberCNPJ} className="form-control" name="cnpj" />
                <button type="submit" className="btn btn-primary">Enviar</button>
            </form>
        </div>
        </>
    )
}