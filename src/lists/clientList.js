import { useNavigate } from "react-router-dom"


export default function ClientList(){
    const navigate = useNavigate()

    const moreDetails = (id)=>{
        navigate(`/client-data/${id}`)
    }

    return(
        <div className="list container-fluid">
            <h3 className="text-center">Lista de Clientes</h3>
            <table className="container text-center">
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>DATA</td>
                        <td>NOME</td>
                        <td>NOME FANTASIA</td>
                        <td>NOME</td>
                        <td>STATUS</td>
                        <td>AÇÕES</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td> {} </td>
                        <td> {} </td>
                        <td> {} </td>
                        <td> {} </td>
                        <td> {} </td>
                        <td> {} </td>
                        <td> <button onClick={()=>moreDetails("10293721000190")} type="butto" className="btn btn-primary">Mais detalhes</button> </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}