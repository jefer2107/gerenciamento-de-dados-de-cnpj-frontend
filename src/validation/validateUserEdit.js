

export const validateUserEdit = async (user=null)=>{
    console.log('validateUser:',user)

    return new Promise(async(res,rej)=>{
        let characters = ["@",".","com"]
        
        if(!user.nameUser === "" || user.email === "" || user.password === "") return rej("Primeiro precisa preecher os campos")

        if(user.email.length > 30) return rej("O email não pode ultrapassar de 30 caracteres")

        characters.forEach((x)=>{
            if(!user.email.includes(x)) return rej("Formato de email inválido")

        })

        if(user.password.length > 6) return rej("A senha não pode ultrapassar de 6 caracteres")

        return res()
    })
}