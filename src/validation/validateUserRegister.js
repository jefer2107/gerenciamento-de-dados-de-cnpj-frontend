

export const validateUserRegister = (user=null)=>{
    console.log('validateUser:',user)

    return new Promise((res,rej)=>{
        let characters = ["@",".","com"]
        
        if(!user.nameUser === "" || user.email === "" || user.password === "") return rej("Primeiro precisa preecher os campos")

        if(user.email.length > 15) return rej("O email não pode ultrapassar de 15 caracteres")

        characters.forEach((x)=>{
            if(!user.email.includes(x)) return rej("Formato de email inválido")

        })

        if(user.password.length > 6) return rej("A senha não pode ultrapassar de 6 caracteres")

        return res()
    })
}