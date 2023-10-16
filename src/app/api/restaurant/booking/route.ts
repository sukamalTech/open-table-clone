import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma= new PrismaClient()
export async function POST(req:NextRequest,res:NextResponse) {
   
   
   try {
    const reqBody=await req.json()
    
    if(!reqBody) return NextResponse.json({
        message:"Please Fill all the Field properly"
    },{status:400})
    const savedBooking= await prisma.booking.create({data:reqBody})
    
    if(!savedBooking) return NextResponse.json({
        message:"Something Wrong"
    },{status:400})
    return NextResponse.json({
        message:"Your booking done  successfully. Our Representative may call you for confirmation"
    },{status:200})
   } catch (error) {
    return NextResponse.json({message:error},{status:200})
   }
   

}