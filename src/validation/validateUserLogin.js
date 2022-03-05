import axios from "axios"

export const validateUserLogin = async (user)=>{
    return new Promise(async(res,rej)=>{
        let characters = ["@",".","com"]
        
        if(!user.nameUser === "" || user.email === "" || user.password === "") return rej("Primeiro precisa informar o email e a senha")

        if(user.email.length > 30) return rej("O email não pode ultrapassar de 30 caracteres")

        characters.forEach((x)=>{
            if(!user.email.includes(x)) return rej("Formato de email inválido")

        })

        if(user.password.length !== 6) return rej("A senha deve ter 6 caracteres")

        try {
            const {data} = await axios.get(`http://localhost:3001/users/getAllunauthenticated`)

            const newData = data.length !== 0? data.filter(e=> e.email === user.email): null

            if(newData.length === null || user.email !== newData[0]?.email || user.password !== newData[0]?.password) return rej("Usuário não cadastrado")

        } catch (error) {
            return rej("Um erro crítico ocorreu!")
        }

    return res()
    })
    
}