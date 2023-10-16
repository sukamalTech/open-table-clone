import {  PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import validator from "validator"
import bcryptjs from "bcryptjs"
//import jwt from "jsonwebtoken"
import * as jose from "jose"
const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const{email,password}=reqBody
    
    // validation code
    const error:string[]=[]
    const validatorSchema=[
      { 
        valid:validator.isEmail(email),
        errorMessage:"Email or Password is invalid1"
      },
    ]
    validatorSchema.forEach((check)=>{
      if(!check.valid){
        error.push(check.errorMessage)
      }
      
    })
    
   if(error.length)return NextResponse.json({message:error[0]},)
   // Check User Email exista
    const user= await prisma.user.findUnique({
        where:{
            email,
        }, 
    })
    
    if(!user) return NextResponse.json({message:"Email or Password is invalid2"},{status:500})
   // Compare password
        const comparePassword= await bcryptjs.compare(password, user.password)
        if(!comparePassword) return NextResponse.json({message:"Email or Password is invalid3"},{status:500})
   // Create JWT token
        const tokenData={ email:user.email }
        const secret= new TextEncoder().encode(process.env.NEXT_SECRET)
        const alg= "HS256"
        const token = await new jose.SignJWT(tokenData)
        .setProtectedHeader({alg}).setExpirationTime("1h").sign(secret)
        // const token = await jwt.sign(tokenData, process.env.NEXT_SECRET!,{
        //     expiresIn:"1h",
        // })

   // Set Token in Cookies
   const response= NextResponse.json({
      message: "Successfully Data Submitted",
      success: true,
      
    });
    response.cookies.set("token",token,{
        httpOnly:true,
    })
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
