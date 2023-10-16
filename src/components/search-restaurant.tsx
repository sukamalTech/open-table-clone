import { restaurantCardProps } from '@/app/page'
import Link from 'next/link'
import React from 'react'
import Price from './price'
import ReviewStar from './review-star'

export default function SearchRestaurant({ data }: { data: restaurantCardProps }) {
    return (
        <>
            <Link href={`/restaurant/${data.slug}`}>
                <div className="h-32 pb-5 w-[450px] flex gap-4  border shadow-lg" key={data.id}>

                    <img src={data.main_image}
                        alt="restrurant image" className='bg-cover h-32 w-48' />
                    <div>
                        <h1 className='text-sky-700 font-extrabold '>{data.name}</h1>
                        <div className='flex justify-evenly'>
                    <ReviewStar length={data.review.length}/>
                   <p>{data.review.length}<span> Reviews</span></p> 
                </div>
                        <div className='flex justify-start gap-4 pl-3'>
                            <Price price={data.price} />
                            <div className='uppercase'>{data.location.name}</div>
                            <div className='capitalize'>{data.cuisine.name}</div>
                        </div>
                        <div>
                            <h1 className='text-gray-600 text-sm ml-5 mt-4'>Booked {(Math.random()*100).toFixed()} times today</h1>
                        </div>
                    </div>

                </div>
            </Link>
        </>
    )
}
