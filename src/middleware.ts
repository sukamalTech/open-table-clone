import { NextResponse ,NextRequest } from 'next/server'
import * as jose from "jose"
// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest, res:NextResponse ) {
    const bearerToken= await req.headers.get("authorization")

    if (!bearerToken){
     return NextResponse.json({"message":"Unauthorized access"})
    }
     const token = bearerToken.split(" ")[1]
 
    if (!token){
     return NextResponse.json({"message":"Unauthorized access"})
    }
     const secret= new TextEncoder().encode(process.env.NEXT_SECRET)
 console.log(` My Secret -${secret}`);
 
 
      try {
         await jose.jwtVerify(token,secret)
      } catch (error) {
         return NextResponse.json({"message":"Unauthorized access"})
      }
   
      
}
 
export const config={
    matcher:["/api/auth/me"]
}