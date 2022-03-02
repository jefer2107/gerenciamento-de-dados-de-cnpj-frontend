import { Link, useNavigate } from "react-router-dom";


export default function Header(){
    const navigate = useNavigate()

    const logOut = ()=>{
        localStorage.clear()
        navigate("/")
    }

    return(
        <div className="container-fluid">
            <header className="container">
                <ol>
                    <li><Link to="/search">Consutar</Link></li>
                    <li><Link to="/client-list">Lista de Clientes</Link></li>
                    <li><Link to="/user-register">Cadastro de usuários</Link></li>
                    <li><Link to="/user-list">Lista de usuários</Link></li>
                    <li><Link to="/">Home</Link></li>
                    <li><button onClick={()=>logOut()}>Sair</button></li>
                </ol>
            </header>
        </div>
    )
}