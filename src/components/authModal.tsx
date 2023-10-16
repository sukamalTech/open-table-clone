"use client"
import React, { useState,useEffect,useContext } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Toaster } from 'react-hot-toast'
import useAuth from '@/hooks/useAuth';
import { SignUpProps } from '@/hooks/useAuth';
import { AuthinticationContext } from '@/context/auth-context';
import LoadingAlert from './loading-alert';
const boxStyle = "w-[400px] h-[500px] absolute bg-white top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] shadow-lg rounded-md"
const blankUserInput={
  first_name: "",
  last_name: "",
  email: "",
  city: "",
  password: "",
  phone: ""
}
// REACT FUNCTION START
export default function AuthModal({ issignin }: { issignin: boolean }) {
  const [open, setOpen] = useState(false);
  const [userInput, setUserInput] = useState<SignUpProps>(blankUserInput)
  const[disabled,setDisabled]=useState(true)
  const authstate=useContext(AuthinticationContext)
  const{setAuthState,isSignIn,isSuccessfulSignUp}=authstate

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { signUp, signIn } = useAuth()
  
  function AuthOptionRendering(signInOption: string, signUpOption: string) {
    return issignin ? signInOption : signUpOption
  }
   
  const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value
    })
  }

  useEffect(()=>{
    setUserInput(blankUserInput)
  },[isSignIn])
useEffect(()=>{
  if(issignin){
    if(userInput.email && userInput.password){
      return setDisabled(false)
    } 
    setDisabled(true)
  } else{
    if(userInput.email && userInput.password && userInput.city && userInput.first_name && userInput.last_name && userInput.phone){
      return setDisabled(false)
    } 
    setDisabled(true)
  }
},[userInput])
  const handelClick = async () => {
    setAuthState({
      loading: false,
      data: null,
      error: null,
      isSignIn:false,
    });
    if (!issignin) {
      signUp({ userInput })
    } else {
      signIn({ email: userInput.email, password: userInput.password })
    }
  }
  // RETURN START
  return (
    <div>
      <Toaster />
      <button onClick={handleOpen}
        className='bg-indigo-600 text-white px-3 py-2 font-semibold rounded-md'>
        {AuthOptionRendering("Sign In", "Sign Up")}
      </button>

      <Modal
        open={open}
        onClose={handleClose}

      >
        <Box className={boxStyle}>
         <LoadingAlert state={authstate}/>
          <div className='flex justify-center border-b pb-4 mt-3'>
            <h1 className='text-2xl font-light'>{AuthOptionRendering("Log In in Open Table", "Create New Account")}</h1>
          </div>

          <div className='p-5'>
            {issignin ? null : (
              <div className='flex justify-between'>
                <input type="text"
                  placeholder='first_name'
                  name='first_name'
                  value={userInput.first_name}
                  onChange={handelChange}
                  className='border focus:outline-none px-2 py-3 w-[47%] m-3 rounded-md'
                />
                <input type="text"
                  placeholder='last_name'
                  name='last_name'
                  value={userInput.last_name}
                  onChange={handelChange}
                  className='border focus:outline-none px-2 py-3 w-[47%] m-3 rounded-md'
                />
              </div>
            )}
            <div className='flex justify-between'>
              <input type="text"
                placeholder='Email'
                name='email'
                value={userInput.email}
                onChange={handelChange}
                className='border focus:outline-none px-2 py-3 w-full m-3 rounded-md'
              />
            </div>
            {issignin ? null : (
              <div className='flex justify-between'>
                <input type="text"
                  placeholder='City'
                  name='city'
                  value={userInput.city}
                  onChange={handelChange}
                  className='border focus:outline-none px-2 py-3 w-[47%] m-3 rounded-md'
                />
                <input type="text"
                  placeholder='Phone Number'
                  name='phone'
                  value={userInput.phone}
                  onChange={handelChange}
                  className='border focus:outline-none px-2 py-3 w-[47%] m-3 rounded-md'
                />
              </div>
            )}
            <div className='flex justify-between'>
              <input type="password"
                placeholder='Password'
                name='password'
                value={userInput.password}
                onChange={handelChange}
                className='border focus:outline-none px-2 py-3 w-full m-3 rounded-md'
              />
            </div>
            <button
              className='rounded-md w-full bg-red-600 text-white flex items-center justify-center px-10 py-3 disabled:bg-gray-400 '
              onClick={handelClick}
              disabled={disabled}
            >{AuthOptionRendering("Sign In", "Sign Up")}
            </button>
          </div>

        </Box>
      </Modal>
    </div>
  );
}