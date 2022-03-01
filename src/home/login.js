import Header from '../components/header'

export default function Login(){
    return(
        <>
        <Header />
        <div className="form-style d-flex">
            <form className="mx-auto">
                <h3 className="text-center">Login</h3>
                <input className="form-control" type='email' name='email' placeholder="Digite o email" />
                <input className="form-control" type='text' name='password' placeholder="Digite a senha" />
                <button className="btn btn-primary w-100">Cadastrar</button>
            </form>
        </div>
        </>
    )
}