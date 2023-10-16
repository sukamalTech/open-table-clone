"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function SearchField() {
  const [searchtext, setSearchtext] = useState("")
  const router=useRouter()
  return (
    <>
      <div className="flex justify-center">
        <input
          type="text"
          name="searchtext"
          value={searchtext}
          onChange={(e) => setSearchtext(e.target.value)}
          className="px-3 py-2 rounded-l-lg focus:outline-none"
        />
        <button
        onClick={()=>{
          if(searchtext==="") return;
          router.push(`/search?city=${searchtext}`);
          setSearchtext("");
        }}
          className="bg-red-600 p-2 rounded-r-lg text-white font-bold">
          Serch restrurant
        </button>
      </div>
    </>
  )
}