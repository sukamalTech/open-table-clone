"use client"
import Link from 'next/link'
import React,{useState,useEffect, useContext} from 'react'
import AuthModal from './authModal'
import useAuth from '@/hooks/useAuth'
import { Toaster } from 'react-hot-toast'
import { Home } from 'lucide-react'
import { AuthinticationContext } from '@/context/auth-context'
export default function MenuBar({user,token}:any) {
   
   const {isSignIn}=useContext(AuthinticationContext)
   const{signOut}=useAuth()
   
    

    return (
        <>
            <div className="flex justify-between items-center px-10 h-12 bg-gray-100 fixed top-0 left-0 right-0 opacity-80 ">
                <Toaster/>
                <div className="text-bold text-green-700 text-lg">
                    <Link className ="flex gap-1" href={"/"}> <h1>Welcome Opentable </h1>
                    <p><Home/></p>
                    </Link>
                </div>

                <div className="flex items-center gap-2 p-1">
                   {isSignIn? 
                   <>
                   <button
                   onClick={signOut}>LogOut</button>
                   </>
                :
                <>
                <AuthModal issignin={true}/>
                <AuthModal issignin={false}/>
                
                </>
                } 
                
                </div>

            </div>

        </>
    )
}