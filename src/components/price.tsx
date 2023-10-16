import React from 'react'

export default function Price({price}:{price:string}) {
    if (price==="CHEAP"){
        return (
            <>
            <div>
             <span className='font-bold text-gray-950'>$$</span> 
             <span className=' text-gray-600'>$$</span> 
             </div>
            </>
          )
    } else if(price==="REGULAR"){
        return (
            <>
            <div>
             <span className='font-bold text-gray-950'>$$$</span> 
             <span className=' text-gray-600'>$</span> 
             </div>
            </>
          )
    } else {
        return (
            <>
            <div>
             <span className='font-bold text-gray-950'>$$$$</span> 
             
             </div>
            </>
          )
    }
  
}
