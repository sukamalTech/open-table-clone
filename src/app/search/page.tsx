import SearchRestaurant from '@/components/search-restaurant'
import Sidebar from '@/components/sidebar'
import { PrismaClient, PRICE} from '@prisma/client'
import Link from 'next/link'
const prisma = new PrismaClient()
import React from 'react'
 export interface SearchParams{city?:string; cuisine?:string; price?:PRICE}

 async function fetchRestaurantCardData({searchParams}:{searchParams:SearchParams}) {
  const where:any={};
  if(searchParams.city){
    const location={
      name:{
        equals:searchParams.city,
      }
    }
    where.location=location;
  }
  if(searchParams.cuisine){
    const cuisine={
      name:{
        equals:searchParams.cuisine,
      }
    }
    where.cuisine=cuisine;
  }
  if(searchParams.price){
    const PRICE={equals:searchParams.price }
    where.price=PRICE;
  }
  const restaurantCard = await prisma.restaurant.findMany({
    where,
    select: {
      id: true,
      main_image: true,
      name: true,
      slug: true,
      price: true,
      location: true,
      cuisine: true,
      review: true
    }
  })
  return restaurantCard
}
export default async function SearchPage({searchParams}:{searchParams:SearchParams}) {
  const restaurantData = await fetchRestaurantCardData({searchParams})
  return (
    <div className='flex'>
      <Sidebar searchparams={searchParams} />
      <div className="grid grid-cols-2 gap-5 p-10 ">
      {restaurantData?.map((data) =>
            <SearchRestaurant data={data}/>

          )}
    </div>
    </div>
  )
}
