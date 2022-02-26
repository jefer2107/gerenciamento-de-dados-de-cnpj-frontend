


const validateFields = async (client)=>{
    return new Promise((res,rej)=>{
        const characters = ['@','.','com']
        let email;

        if(client.name === "") return rej('O campo nome precisa ser preenchido')

        if(client.address === "") return rej('O campo endereço precisa ser preenchido')

        if(client.email === "")return rej('Email não informado')

        characters.forEach(e=> {if(!client.email.includes(e)){
            email = false
            
        }})

        if(client.email && email===false) return rej('Formato de email não existe')

        if(client.telephone === "") return rej('O campo telefone precisa ser preenchido')

        return res()
    })
    

}

export default validateFields