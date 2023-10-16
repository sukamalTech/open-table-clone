import React from 'react'
import { PrismaClient, PRICE, Location, Cuisine, Review } from '@prisma/client'
import Price from '@/components/price'
import Link from 'next/link'
import ReviewStar from './review-star'
interface RestaurantProp {
    name: string
    images: string[]
    description: string
    close_time: string,
    open_time: string,
    slug: string
    price: PRICE
    location: Location
    cuisine: Cuisine
    review:Review[]
}
export default function RestaurantDetail({ restaurant }: { restaurant: RestaurantProp }) {
    return (
        <>
            <div className="-mt-12 w-[60%]  bg-white">
                <div className='flex items-center justify-start gap-3 py-3 border-b mx-10'>
                    <Link href={`/restaurant/${restaurant.slug}`} className=' font-semibold text-gray-500 text-sm '>Overview</Link>
                    <Link href={`/restaurant/${restaurant.slug}/menu`} className=' font-semibold text-gray-500 text-sm'>Menu</Link>
                    
                </div>
                <div className='flex items-center justify-start gap-3 py-3 border-b mx-10'>
                    <h1 className=' font-extrabold text-sky-500 text-4xl py-5 '>{restaurant.name}</h1>
                </div>
                <div className='flex justify-evenly'>
                    <ReviewStar length={restaurant.review.length}/>
                   <p>{restaurant.review.length}<span> Reviews</span></p> 
                    <span><Price price={restaurant.price} /></span>
                </div>
                <div className='mx-10 my-3'>
                    <p>{restaurant.description}</p>
                </div>
                <div className='mx-10 my-3'>
                    <h1 className='text-2xl border-b pb-5'>{restaurant.images.length} Photos</h1>
                    <div className='grid grid-cols-2 gap-2'>
                        {restaurant.images.map((image) =>
                            <img src={image} alt="" key={image}
                                className='object-cover h-48 w-60' />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
