import  Jwt  from "jsonwebtoken";



export async function getUserByToken(token:string | undefined){
   if(!token) return
    const payLoad = await Jwt.decode(token) as {email:string} 
    
    if(!payLoad) return 
    //const email= payLoad.email
    return payLoad.email
}