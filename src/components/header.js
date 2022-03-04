import { Link, useNavigate } from "react-router-dom";


export default function Header({menu=false}){
    const navigate = useNavigate()

    const logOut = ()=>{
        localStorage.clear()
        navigate("/")
    }

    return(
        <div className="container-fluid">
            {menu===true?
                <header className="container">
                    <ol>
                        <li><Link to="/search">Consultar</Link></li>
                        <li><Link to="/client-list">Lista completa de Clientes</Link></li>
                        <li><Link to="/my-client-list">Meus Clientes</Link></li>
                        <li><Link to="/user-list">Lista de usuários</Link></li>
                        <li><Link to="/user-register">Cadastro de usuários</Link></li>
                        <li><Link to="/user-profile">Meu perfil</Link></li>
                        <li><Link to="/">Home</Link></li>
                        <li><button onClick={()=>logOut()}>Sair</button></li>
                    </ol>
                </header>
            :
                <header className="container">
                        <ol>
                            <li><Link to="/search">Consultar</Link></li>
                            <li><Link to="/client-list">Lista completa de Clientes</Link></li>
                            <li><Link to="/my-client-list">Meus Clientes</Link></li>
                            <li><Link to="/user-profile">Meu perfil</Link></li>
                            <li><Link to="/">Home</Link></li>
                            <li><button onClick={()=>logOut()}>Sair</button></li>
                        </ol>
                    </header>
            }
            
        </div>
    )
}