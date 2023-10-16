


export default async function Loading() {

  const restaurant=[1,2,3,4,5,6,7,8,]

  return (
    <>
      <main className="w-[90%] min-h-screen bg-gray-200 mx-auto">
        <div className="bg-gradient-to-r from-indigo-950 to-indigo-700 h-48 w-full flex items-center justify-center">
          <div className="h-12 w-72 bg-white">

          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-10 gap-5">
          {restaurant.map((data) =>
           <div className="h-48 w-60 bg-black/30" key={data}>

           </div>
          )}


        </div>
      </main>
    </>
  )
}

