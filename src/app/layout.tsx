import MenuBar from '@/components/menubar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import AuthContext from '@/context/auth-context'
import "react-datepicker/dist/react-datepicker.css";
import { cookies } from 'next/headers'
import { getUserByToken } from '@/helper/get-user-by-token'
import Footer from '@/components/Footer'
const inter = Inter({ subsets: ['latin'] })



export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const cookieStore = cookies()
  const token = cookieStore.get('token')
  const payload= await getUserByToken(token?.value)
  console.log(payload);
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <>
        <AuthContext>
       
        <MenuBar user={payload} token={token}/>
        {children}
        <Footer/>
        </AuthContext>
        </>
        </body>
    </html>
  )
}
