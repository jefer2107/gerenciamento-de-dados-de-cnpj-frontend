import { Link } from "react-router-dom";


export default function Header(){
    return(
        <div className="container-fluid">
            <header className="container">
                <ol>
                    <li><Link to="/search">Consutar</Link></li>
                    <li><Link to="/client-list">Lista de Clientes</Link></li>
                </ol>
            </header>
        </div>
    )
}