import { Metadata } from 'next'
import React from 'react'
import { Item, PrismaClient } from '@prisma/client'
import Link from 'next/link'
const prisma=new PrismaClient()

export const metadata: Metadata = {
  title: 'OpenTableClone | Menu',
  description: 'Best Restaurant App',
}

async function fetchDataByRestaurant(slug: string) {
  const restaurant = await prisma.restaurant.findUnique({
      where: {
          slug,
      },
      select: {
          main_image:true,
          items:true,
          slug:true
      }
  })
  return restaurant;
}
export default async function MenuPage({params}:{params:{slug:string}}) {
  const data= await fetchDataByRestaurant(params.slug)
  
  return (
    <>
    <div className="w-[90%] min-h-screen mx-auto flex flex-col">
        <div className='w-full h-[300px] bg-red-300 overflow-hidden '>
            <img src={data?.main_image} alt=""
                className='object-cover h-full w-full' />
        </div>
        <div className="flex justify-center px-32">
        <div className="-mt-12 w-[80%]  bg-white h-auto ">
                <div className='flex items-center justify-start gap-3 py-3 border-b mx-10'>
                    <Link href={`/restaurant/${data?.slug}`} className=' font-semibold text-gray-500 text-sm '>Overview</Link>
                    <Link href={`/restaurant/${data?.slug}/menu`} className=' font-semibold text-gray-500 text-sm'>Menu</Link>
                </div>
                <div className='grid grid-cols-2 p-4 gap-3'>
                  {
                    data?.items.map((item:Item)=>(
                      <div className='bg-gray-100 border border-gray-300 rounded-md h-32'>
                        <div className='flex justify-between px-5 my-2'>
                        <h1 className='font-bold text-indigo-800 text-base uppercase'>{item.name}</h1>
                        <h1 className='font-semibold text-lg uppercase'>{item.price}</h1>

                        </div>
                        <p className='text-gray-600 text-xs p-2'>{item.description}</p>

                      </div>
                    ))
                  }

                </div>
            
        </div>
        </div>

    </div>
</>
  )
}
