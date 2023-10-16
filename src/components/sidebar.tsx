import React from 'react'
import { PrismaClient, PRICE} from '@prisma/client'
import Link from 'next/link'
import { SearchParams } from '@/app/search/page'
const prisma = new PrismaClient()
async function fetchLocation() {
    const locations=await prisma.location.findMany()
    return locations
}
async function fetchCuisine() {
    const cuisines=await prisma.cuisine.findMany()
    return cuisines
}
const priceObj=[
  {
  name:PRICE.CHEAP,
  label:"$",
},
{
  name:PRICE.REGULAR,
  label:"$$",
},
{
  name:PRICE.EXPENSIVE,
  label:"$$$",
}]
export default async function Sidebar({searchparams}:{searchparams:SearchParams}) {
    const locations =await fetchLocation()
    const cuisines = await fetchCuisine()
    
  return (
    <div className='inline'>
    <div className=' bg-indigo-950  h-screen w-44 flex flex-col items-center space-y-3  '>
      <div className='flex flex-col space-y-2 border-b p-5 ' >
        {locations?.map((location)=>
        <Link href={{
            pathname: '/search',
            query: {
              ...searchparams,
               city: `${location.name}` 
              },
          }}
          className={`uppercase text-white ${searchparams.city===location.name?"text-yellow-300" :""} `}
          key={location.id}
          >{location.name}</Link>
        )}
      </div>
      <div className='flex flex-col space-y-2 border-b p-5 ' >
        {cuisines?.map((cuisine)=>
        <Link href={{
            pathname: '/search',
            query: { 
              ...searchparams,
              cuisine: `${cuisine.name}` 
            },
          }}
          className={`uppercase text-white ${searchparams.cuisine===cuisine.name?"text-yellow-300" :""} `}
          key={cuisine.id}
          >{cuisine.name}</Link>
        )}
      </div>
      <div className='flex   p-5 '>
          {priceObj.map((p)=>
          <Link href={{
            pathname: '/search',
            query: { 
              ...searchparams,
              price: `${p.name}` 
            },
          }}
          className={`uppercase text-white p-2 border border-white w-12 text-center ${searchparams.price===p.name?"text-yellow-300" :""}`}
          key={p.name} >
          {p.label}
          </Link>
          )}
      </div>
    </div>
    </div>
  )
}
