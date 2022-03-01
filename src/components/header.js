import { Link } from "react-router-dom";


export default function Header(){
    return(
        <div className="container-fluid">
            <header className="container">
                <ol>
                    <li><Link to="/search">Consutar</Link></li>
                    <li><Link to="/client-list">Lista de Clientes</Link></li>
                    <li><Link to="/user-register">Cadastro de usuários</Link></li>
                    <li><Link to="/user-list">Lista de usuários</Link></li>
                    <li><Link to="/">Home</Link></li>
                </ol>
            </header>
        </div>
    )
}