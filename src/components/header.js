import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function Header({menu=false}){
    const navigate = useNavigate()
    const [message, setMessage] = useState("dddddlllllllllllllll")
    const [numberCNPJ, setNumberCNPJ] = useState("")

    const logOut = ()=>{
        localStorage.clear()
        navigate("/")
    }

    const changeNumberCNPJ = ({target})=>{
        setNumberCNPJ(()=>{
            return {[target.name]: target.value}
        })
    }

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
        <div>
            {menu===true?
                // <header className="container">
                //     <ol>
                //         <li><Link to="/search">Consultar</Link></li>
                //         <li><Link to="/client-list">Lista completa de Clientes</Link></li>
                //         <li><Link to="/my-client-list">Meus Clientes</Link></li>
                //         <li><Link to="/user-list">Lista de usuários</Link></li>
                //         <li><Link to="/user-register">Cadastro de usuários</Link></li>
                //         <li><Link to="/user-profile">Meu perfil</Link></li>
                //         <li><Link to="/">Home</Link></li>
                //         <li><button onClick={()=>logOut()}>Sair</button></li>
                //     </ol>
                // </header>

                // <nav className="navbar navbar-expand-lg navbar-light bg-light">
                //     <div className="container-fluid">
                //         <a className="navbar-brand" href="#">Gerenciamento de dados</a>
                //         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                //             <span className="navbar-toggler-icon"></span>
                //         </button>
                //         <div className="collapse navbar-collapse" id="navbarNavDropdown">
                //             <ul className="navbar-nav">
                //                 <li className="nav-item">
                //                     <a className="nav-link active" aria-current="page" href="#">Meu perfil</a>
                //                 </li>
                //                 <li className="nav-item">
                //                     <a className="nav-link" href="#">Consultar</a>
                //                 </li>
                //                 <li className="nav-item dropdown">
                //                     <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink1" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                //                         Clientes
                //                     </a>
                //                     <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink1">
                //                         <li><a className="dropdown-item" href="#">Lista de clientes</a></li>
                //                         <li><a className="dropdown-item" href="#">Meus clientes</a></li>
                //                     </ul>
                //                 </li>
                //                 <li className="nav-item dropdown">
                //                     <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink2" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                //                         Dropdown link
                //                     </a>
                //                     <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink2">
                //                         <li><a className="dropdown-item" href="#">Action</a></li>
                //                         <li><a className="dropdown-item" href="#">Another action</a></li>
                //                         <li><a className="dropdown-item" href="#">Something else here</a></li>
                //                     </ul>
                //                 </li>
                //             </ul>
                //             <span>
                //                 <button type="button" className="btn btn-outline-dark" onClick={()=>logOut()}>Sair</button>
                //             </span>
                //         </div>
                //     </div>
                // </nav>

                <nav className="navbar navbar-light bg-light navbar-expand-lg fixed-top">
                    <div className="container-fluid">
                        <h1 className="navbar-brand" href="#">Gerenciamento de dados</h1>
                        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                            <div className="offcanvas-header">
                                <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Offcanvas</h5>
                                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div className="offcanvas-body">
                                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/user-profile">Meu perfil</Link>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link dropdown-toggle" to="#" id="offcanvasNavbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Clientes
                                        </Link>
                                        <ul className="dropdown-menu" aria-labelledby="offcanvasNavbarDropdown">
                                            <li><Link className="dropdown-item" to="/client-list">Lista de clientes</Link></li>
                                            <li><Link className="dropdown-item" to="/my-client-list">Meus clientes</Link></li>
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link dropdown-toggle" to="#" id="offcanvasNavbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Usuários
                                        </Link>
                                        <ul className="dropdown-menu" aria-labelledby="offcanvasNavbarDropdown">
                                            <li><Link className="dropdown-item" to="/user-list">Lista de usuários</Link></li>
                                            <li><Link className="dropdown-item" to="/user-register">Cadastro de usuários</Link></li>
                                        </ul>
                                    </li>
                                </ul>
                                <form onSubmit={redirectToCnpj} class="d-flex">
                                    <input onChange={changeNumberCNPJ} className="form-control me-2" name="cnpj" type="search" placeholder="Digite o número do cnpj" aria-label="Search"/>
                                    <button type="submit" className="btn btn-outline-primary">Consultar</button>
                                    <div className="text-center">
                                        <span> {message} </span>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </nav>

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