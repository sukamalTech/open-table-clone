import RestrurantCard from "@/components/restaurantcard";
import SearchField from "@/components/searchField";
import { getUserByToken } from "@/helper/get-user-by-token";
import { PrismaClient, PRICE, Cuisine ,Location, Review} from '@prisma/client'
import { Metadata } from "next";
import { cookies } from 'next/headers'
const prisma = new PrismaClient()

export const metadata: Metadata = {
  title: 'OpenTableClone',
  description: 'Best Restaurant App',
}


export interface restaurantCardProps {
  id: string,
  main_image: string,
  name: string,
  slug: string,
  price: PRICE,
  location: Location,
  cuisine: Cuisine,
  review:Review[]
}
async function fetchRestaurantCardData() {
  const restaurantCard = await prisma.restaurant.findMany({
    select: {
      id: true,
      main_image: true,
      name: true,
      slug: true,
      price: true,
      location: true,
      cuisine: true,
      review:true
    }
  })
  return restaurantCard
}

export default async function Home() {
  
  const restaurantData = await fetchRestaurantCardData()

  return (
    <>
      <main className="w-[90%] min-h-screen bg-gray-200 mx-auto mt-12">
        <div className="bg-gradient-to-r from-indigo-950 to-indigo-700 h-48 w-full flex flex-col items-center justify-center">
          <h1 className="text-4xl text-white pb-5">Find your table for any occasion</h1>
          <SearchField />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-10 gap-5">
          {restaurantData?.map((data) =>
            <RestrurantCard data={data}/>

          )}


        </div>
      </main>
    </>
  )
}
