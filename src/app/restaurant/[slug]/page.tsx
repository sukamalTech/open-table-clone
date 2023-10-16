
import ReservationCard from '@/components/reservation-card'
import RestaurantDetail from '@/components/restaurant-details'
import { PrismaClient, PRICE, Location, Cuisine } from '@prisma/client'
import { Metadata } from 'next'
const prisma = new PrismaClient()
import React from 'react'

export const metadata: Metadata = {
    title: 'OpenTableClone | Restaurant',
    description: 'Best Restaurant App',
}

type Props = {
    params: { slug: string },
    searchParams: { time?: string; date?: string; person?: string; id?: string; table?: string }
}
async function fetchDataByRestaurant(slug: string) {
    const restaurant = await prisma.restaurant.findUnique({
        where: {
            slug,
        },
        select: {
            id: true,
            name: true,
            main_image: true,
            images: true,
            description: true,
            close_time: true,
            open_time: true,
            slug: true,
            price: true,
            location: true,
            cuisine: true,
            table: true,
            review:true
        }
    })
    return restaurant;
}
// MAIN PAGE COMPONENT
export default async function IndividualRestrurant(props: Props) {
    const restaurant = await fetchDataByRestaurant(props.params.slug)



    if (!restaurant) return;
    return (
        <div>
            <div className="w-[90%] min-h-screen mx-auto flex flex-col mt-12">
                <div className='w-full h-[300px] bg-red-300 overflow-hidden '>
                    <img src={restaurant.main_image} alt=""
                        className='object-cover h-full w-full' />
                </div>
                <div className="flex justify-between px-10">
                    <RestaurantDetail restaurant={restaurant} />

                    <ReservationCard restaurant={restaurant} />
                </div>

            </div>
        </div>
    )
}
