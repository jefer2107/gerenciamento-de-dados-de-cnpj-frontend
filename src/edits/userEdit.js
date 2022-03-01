

export default function UserEdit(){
    return(
        <div className="d-flex form-style">
            <form className="mx-auto">
                <h3 className="text-center">Editar Usuário</h3>
                <div className="form-group">
                    <label>Nome:</label>
                    <input className="form-control" type="text" name="name" />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input className="form-control" type="text" name="name" />
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="admin" id="flexRadioDefault1" checked={true}/>
                    <label className="form-check-label" for="flexRadioDefault1">
                        Usuário
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="admin" id="flexRadioDefault2" checked={false}/>
                    <label className="form-check-label" for="flexRadioDefault2">
                        Administrador
                    </label>
                </div>
                <button className="tn btn-primary w-100">Salvar</button>
            </form>
        </div>
    )
}