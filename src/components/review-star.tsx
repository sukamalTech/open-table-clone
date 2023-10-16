import { Star } from 'lucide-react'
import React from 'react'
const FilledStar=()=>{
    return<Star fill='yellow' strokeWidth='1px' size={20}/>
}
const EmptyStar=()=>{
    return<Star  strokeWidth='1px' size={20}/>
}
export default function ReviewStar({length}:{length:number}) {
    if (length >= 3) {
        return (
            <div className='flex justify-center'>
                <FilledStar />
                <FilledStar />
                <FilledStar />
                <FilledStar />
                <EmptyStar />
            </div>
  )
} else if(length ===2){
    return (
        <div className='flex justify-center'>
            <FilledStar />
            <FilledStar />
            <FilledStar />
            <EmptyStar />
            <EmptyStar />
        </div>
)
}else if(length ===1){
    return (
        <div className='flex justify-center'>
            <FilledStar />
            <FilledStar />
            <EmptyStar />
            <EmptyStar />
            <EmptyStar />
        </div>
)
}else if(!length){
    return (
        <div className='flex justify-center'>
            
            <EmptyStar />
            <EmptyStar />
            <EmptyStar />
            <EmptyStar />
            <EmptyStar />
        </div>
)
}

}
