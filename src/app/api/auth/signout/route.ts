import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req:NextRequest){
    cookies().delete('token')
    return NextResponse.json({message:"Log Out  Successfully"},{status:200})
}