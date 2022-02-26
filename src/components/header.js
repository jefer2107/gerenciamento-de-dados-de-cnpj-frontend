import { Link } from "react-router-dom";


export default function Header(){
    return(
        <div className="container-fluid">
            <header className="container">
                <ol>
                    <li><Link to="/search">Search</Link></li>
                </ol>
            </header>
        </div>
    )
}