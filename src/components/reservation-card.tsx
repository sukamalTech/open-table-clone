"use client"
import React, { useState } from 'react'
import { partySize } from '@/data';
import { getOpeningTime } from '@/helper/get-opening-time';
import { printDisplayTime } from '@/helper/print-display-time';
import Link from 'next/link';


import DatePicker from "react-datepicker";
import axios from 'axios';
interface ReservationProps {
    slug: string;
    open_time: string;
    close_time: string;
    id: string;
    table: number
}
interface Times {
    displayTime: string;
    avalibility: boolean;
    date:string
}

export default function ReservationCard({ restaurant }: { restaurant: ReservationProps }) {

    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
    const [selectedTime, setSelectedTime] = useState("")
    const [person, setPerson] = useState("")

    const [isLoading, SetIsLoading] = useState(false)
    const [avalibleTime, setAvaliableTime] = useState<Times[]>([])
// START OF ON-CLICK FUNCTION
    const handleClick = async () => {
        const onlyDate = `${selectedDate?.getFullYear()}-${selectedDate?.getMonth()}-${selectedDate?.getDate()}`
                         
        try {
            SetIsLoading(true)
            const res = await axios.post(`/api/restaurant/avalibility`, {
                person, 
                selectedDate: onlyDate,
                selectedTime,
                id: restaurant.id,
                table: restaurant.table,
                slug: restaurant.slug
            })
            setAvaliableTime(res.data.returntimeWithAvalibility)
            SetIsLoading(false)
        } catch (error: any) {
        }
    }
// CALL OF FUNCTION FOR OPENING TIME RANGE
    const openingTimes = getOpeningTime(restaurant.open_time, restaurant.close_time)
   
    return (
        <div className="-mt-12 w-[30%] ">
            <div className='shadow-md h-auto bg-white '>
                {/* HEADING */}
                <div className='flex  items-center justify-center py-3 border-b'>
                    <h1 className=' font-extrabold text-gray-700'>Make a reservation</h1>
                </div>
                 {/* PARTY SIZE SELECT BOX */}
                <div className='border-b h-20 w-full flex flex-col items-center gap-2 mt-2'>
                    <label htmlFor="partySizeWindow">Select Party Size</label>
                    <select
                        className='border-[1px] border-gray-300 px-2 py-1'
                        name="person" id="partySizeWindow"
                        value={person}
                        onChange={(e) => setPerson(e.target.value)}
                    >
                        <option>Pl Select</option>
                        {partySize.map((p) => <option key={p.value} value={p.value}>{p.name}</option>)}
                    </select>
                </div>
                 {/* DATE AND TIME SELECT BOX */}
                <div className='border-b h-28 flex p-5 gap-5'>
                     {/* DATE */}
                    <div className='w-[40%]'>
                        <h1>Select date</h1>
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            className='py-3 px-1 font-light text-sm w-28 border focus:outline-none'
                            dateFormat="MMMM d" />
                    </div>
                     {/* TIME */}
                    <div>
                        <label htmlFor="timeWindow">Select Time</label>
                        <select name="time" id="timeWindow"
                            value={selectedTime}
                            onChange={(e) => setSelectedTime(e.target.value)}
                            className=' border px-2 py-2.5'
                        >
                            <option>Pl Select</option>
                            {openingTimes.map((time) => <option key={time.time} value={time.time}>{time.displayTime}</option>)}
                        </select>
                    </div>
                </div>
                    {/* FIND TIME BUTTON */}
                <div className='border-b h-16 flex p-5 items-center'>
                    <button
                        className='w-full text-white bg-red-500 disabled:bg-gray-500 px-4 py-2 rounded-md'
                        onClick={handleClick}
                    >{isLoading?" Loading....":"Find table"}
                    </button>
                </div>
                {/* START of SELECTED TIME */}
                <div className='flex flex-col justify-between h-auto'>
                    <div className='grid grid-cols-3 gap-3 p-3'>
                        { isLoading? "":avalibleTime?.map((t) =>
                            <div key={t.displayTime}
                                className={`px-1 py-1 text-white h-8 w-20  rounded-sm flex justify-center items-center ${t.avalibility ? "bg-red-600" : "bg-slate-400"} `}
                                
                            ><Link href={{
                                pathname: `/restaurant/${restaurant.slug}/book-table`,
                                query: {
                                    time: `${t.displayTime}`,
                                    date: `${t.date}`,
                                    person:`${person}`,
                                    restaurant_id:`${restaurant.id}`
                                }
                            }}  >
                                <button disabled={!t.avalibility}>{printDisplayTime(t.displayTime)}</button>
                                
                                </Link>
                            </div>
                        )}
                    </div>
                    <div className='p-4'>
                        <h1 className='text-sm text-gray-600 p-2'>Booked {(Math.random()*100).toFixed()} Times Today</h1>
                    </div>
                </div>
                     {/* END of SELECTED TIME */}
            </div>
        </div>
    )
}
