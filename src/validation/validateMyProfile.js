import axios from "axios"


export const validateMyProfile = async (user=null,id)=>{
    console.log('validateUser:',user)

    return new Promise(async(res,rej)=>{
        let characters = ["@",".","com"]
        
        if(!user.nameUser === "" || user.email === "" || user.password === "") return rej("Primeiro precisa preecher os campos")

        if(user.email.length > 30) return rej("O email não pode ultrapassar de 30 caracteres")

        characters.forEach((x)=>{
            if(!user.email.includes(x)) return rej("Formato de email inválido")

        })

        try {
            const {data} = await axios.get(`http://localhost:3001/users/getAll`)

            const newData = data.length !== 0? data.filter(e=> e.email === user.email):null

            if(user.email === newData[0]?.email && newData[0]?.id !== id) return rej("Já existe um cadastro com este email")

        } catch (error) {
            return rej("Um erro crítico ocorreu!")
        }

        if(user.password.length > 6) return rej("A senha não pode ultrapassar de 6 caracteres")

        return res()
    })
}