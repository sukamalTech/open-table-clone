import React from 'react'
import { restaurantCardProps } from '@/app/page';
import Price from './price';
import Link from 'next/link';
import {Star} from "lucide-react"
import ReviewStar from './review-star';
import Image from 'next/image';

export  const RestrurantCard=({data}:{data:restaurantCardProps})=> {
  return (
    <>
      <div className="h-auto pb-5 w-[225px] flex flex-col  border shadow-lg rounded-lg" key={data.id}>
       <Link href={`/restaurant/${data.slug}`}>
        <Image 
        src={data.main_image} width={230}
        height={120}
        alt="restrurant image" className='bg-cover h-[120px]'/>
        <h1 className='text-sky-700 font-extrabold mt-2 pl-2'>{data.name}</h1>
        <div className='flex justify-between items-center px-2'>
            <div>
              <ReviewStar length={data.review.length}/>
              
              </div>
            <p>{data.review.length}
            <span>Reviews</span></p>
            
        </div>
        <div className='flex justify-start gap-3  items-center pl-2'>
            <Price price={data.price}/>
            <div className='capitalize'>{data.location.name}</div>
            <div className='uppercase text-sm'>{data.cuisine.name}</div>
        </div>
        <div>
            <h1 className='text-sm text-gray-600 mt-2 pl-2 '>Booked {(Math.random()*100).toFixed()} times today</h1>
        </div>
        </Link>
      </div>
    </>
  )
}
export default RestrurantCard;