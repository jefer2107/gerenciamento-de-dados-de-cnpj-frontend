import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function Header({menu=false}){
    const navigate = useNavigate()
    const [message, setMessage] = useState("")
    const [numberCNPJ, setNumberCNPJ] = useState("")
    const [btn, setBtn] = useState(true)

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
        event.preventDefault()
        validateCnpj(numberCNPJ.cnpj).then(()=>{
            setBtn(false)
            setTimeout(()=>{
                navigate(`/client-data/${numberCNPJ.cnpj}`)
                setBtn(true)
            },3000)

        }).catch((error)=>{
            setMessage(error)
            setTimeout(()=>{
                setMessage("")
            },7000)
        })

    }

    return(
        <div>
            {menu===true?
                <nav className="navbar navbar-light bg-light navbar-expand-lg fixed-top mb-2">
                    <div className="container-fluid">
                        <h1 className="navbar-brand" href="#">Gerenciamento de dados</h1>
                        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                            <div className="offcanvas-header">
                                <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Gerenciamento de dados</h5>
                                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div className="offcanvas-body">
                                <ul className="navbar-nav justify-content-first flex-grow-1 pe-3">
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
                                    <button onClick={()=>logOut()} type="button" className="btn btn-link text-dark">Sair</button>
                                </ul>
                                
                                <form onSubmit={redirectToCnpj} class="d-flex">
                                    <input onChange={changeNumberCNPJ} className="form-control me-2" name="cnpj" type="search" placeholder="Digite o número do cnpj" aria-label="Search"/>
                                    {btn === true?
                                        <button type="submit" className="btn btn-outline-primary">Consultar</button>
                                    :
                                    <div className="d-flex justify-content-center">
                                        <div class="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                    }
                                    
                                </form>
                                <div className="text-center text-danger my-2 mx-2">
                                    <span> {message} </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            :
                <nav className="navbar navbar-light bg-light navbar-expand-lg fixed-top">
                    <div className="container-fluid">
                        <h1 className="navbar-brand" href="#">Gerenciamento de dados</h1>
                        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                            <div className="offcanvas-header">
                                <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Gerenciamento de dados</h5>
                                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div className="offcanvas-body">
                                <ul className="navbar-nav justify-content-first flex-grow-1 pe-3">
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/user-profile">Meu perfil</Link>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link dropdown-toggle" to="#" id="offcanvasNavbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Clientes
                                        </Link>
                                        <ul className="dropdown-menu" aria-labelledby="offcanvasNavbarDropdown">
                                            <li><Link className="dropdown-item" to="/my-client-list">Meus clientes</Link></li>
                                        </ul>
                                    </li>
                                </ul>
                                <span onClick={()=>logOut()} type="button" className="my-2 mx-4">Sair</span>
                                <form onSubmit={redirectToCnpj} class="d-flex">
                                    <input onChange={changeNumberCNPJ} className="form-control me-2" name="cnpj" type="search" placeholder="Digite o número do cnpj" aria-label="Search"/>
                                    <button type="submit" className="btn btn-outline-primary">Consultar</button>
                                </form>
                                <div className="text-center my-2 mx-2">
                                    <span> {message} </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            }
            
        </div>
    )
}