import {  PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

import validator from "validator"
import bcryptjs from "bcryptjs"

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const{email,first_name,last_name,city,password,phone}=reqBody
    // validation code
    const error:string[]=[]
    const validatorSchema=[
      { 
        
        valid:validator.isLength(first_name,{
          min:2,
          max:20
        }),
        errorMessage:"First name should contain 1 to 20 Char"
      },
      { 
        valid:validator.isLength(last_name,{
          min:1,
          max:20
        }),
        errorMessage:"Last name should contain 1 to 20 Char"
      },
      { 
        valid:validator.isEmail(email),
        errorMessage:"Email is invalid"
      },
      { 
        valid:validator.isLength(city,{
          min:2,
          max:20
        }),
        errorMessage:"City should contain 1 to 20 Char"
      },
      { 
        valid:validator.isMobilePhone(phone),
        errorMessage:"Please give a valid Phone Number"
      },
      { 
        valid:validator.isStrongPassword(password),
        errorMessage:"Please give a Strong Password"
      },
    ]
    validatorSchema.forEach((check)=>{
      if(!check.valid){
        error.push(check.errorMessage)
      }
      
    })
    // user.findone(email)
   if(error.length)return NextResponse.json({message:error[0]},{status:400})
    const useremail= await prisma.user.findUnique({
        where:{
            email,
        }, 
    })
    if(useremail) return NextResponse.json({message:"User Already exists"})
   // create hashed password
      const salt = await bcryptjs.genSalt(10)
      const hashedPassword= await bcryptjs.hash(password,salt)
      const newData={
        first_name,
        last_name,
        email,
        password:hashedPassword,
        city,
        phone
      }
    const savedUser=await prisma.user.create({data:newData})
   if(!savedUser) return NextResponse.json({message:"Data Not Saved in Database"})
    return NextResponse.json({
      message: "Successfully SignUp. Please Login to Continue",
      success: true,
      status: 200,
      savedUser
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
