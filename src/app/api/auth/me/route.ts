import { NextRequest, NextResponse } from "next/server";

import  Jwt  from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma =new PrismaClient()
export async function POST(req:NextRequest, res:NextResponse){
   
   const bearerToken= await req.headers.get("authorization") as string
    const token = bearerToken.split(" ")[1]
     const payLoad = await Jwt.decode(token) as {email:string} 
     if (!payLoad.email){
        return NextResponse.json({"message":"Unauthorized access(email)"})
       }
   const user= await prisma.user.findUnique({
    where:{
        email:payLoad.email
    },
    select:{
        first_name:true,
        last_name:true,
        email:true,
        city:true,
        phone:true,
        
    }
   })

   
   
    return NextResponse.json({user})
}