import React from 'react'
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { User } from '@prisma/client';
 export interface State{
    loading:boolean,
    data: string | null ,
    error:string | null
  }
export default function LoadingAlert({state}:{state:State}) {
if(state.loading===false && state.data===null && state.error===null) return
    if(state.loading){
       return <div className='flex items-center justify-center'>
        <CircularProgress color="secondary" />
        </div>
       
    } else if(state.data){

        return <Alert severity="success">{state.data}</Alert>
    } else {
        return <Alert severity="error">{state.error}</Alert>
    }
  
   
}
