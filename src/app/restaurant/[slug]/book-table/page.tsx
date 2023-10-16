"use client"
import { useForm, SubmitHandler } from "react-hook-form"
import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";

import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import axios from "axios";

import { printDisplayDate, printDisplayTime } from "@/helper/print-display-time";
import LoadingAlert, { State } from "@/components/loading-alert";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'OpenTableClone | Book Table',
  description: 'Best Restaurant App',
}

type Inputs = {
  booker_name: string
  booker_email: string
  booker_phone: string
  booker_request: string
}


export default function BookTable() {

const [state, setState]=useState<State>({
  loading:false,
  data:null,
  error:null
})
  const { slug } = useParams()
  const searchparams = useSearchParams()
  const time = searchparams.get("time")
  const date = searchparams.get("date")
  const restaurant_id = searchparams.get("restaurant_id")
  const person = Number(searchparams.get("person"))

  const displayTime = printDisplayTime(time)
  const displayDate = printDisplayDate(date)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const table_req = Math.ceil(Number(person) / 4)

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setState({
      loading: true,
      data: null,
      error: null
    })
    const reqBody = {
      booking_date: date,
      booking_time: time,
      booker_email: data.booker_email,
      booker_phone: data.booker_phone,
      booker_name: data.booker_name,
      booker_request: data.booker_request,
      no_of_table: table_req,
      party_size: person,
      slug,
      restaurant_id,
    }

    try {
      const res = await axios.post("/api/restaurant/booking", reqBody)
      setState({
        loading: false,
        data: res.data.message,
        error: null
      })
    } catch (error: any) {
      console.log(error);
      
      setState({
        loading: false,
        data:null,
        error: "Some thing Wrong"
      })
    }

  }



  return (

    <main className="grid grid-cols-3 px-32 py-10">
      {/* LEFT Section */}
      <section className="col-span-2 ">
        <h1 className="font-bold text-sm my-4">You are almost done !</h1>
        {/* Restaurant INFO Section */}
        <section className="grid grid-cols-7">
          <div>

          </div>
          <div className="col-span-6">
            <h1 className="text-2xl font-bold">Highball & Harvest</h1>
            <div className="flex space-x-10">
              <h1>{displayDate}</h1>
              <h1>{displayTime}</h1>
              <h1>{person} People</h1>
            </div>

          </div>
        </section>
        {(state.loading===false && state.data===null && state.error===null)?
        (<div className="bg-blue-100 rounded-xl px-10 py-2 my-5">
          <h1>We’re holding this table for you for 5 Minute </h1>
        </div>):""}
        <div className=" px-10 py-2 my-5">
          <LoadingAlert state={state}/>
          
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-3">
          <div className="flex max-w-md flex-col">
            <TextField label="Booker Name" variant="outlined"
              {...register("booker_name", { required: true })} />
            {errors.booker_name && <span className="text-sm text-red-500">This field is required</span>}
          </div>

          <div className="flex max-w-md flex-col">
            <TextField label="Booker Email" variant="outlined"
              {...register("booker_email", { required: true })} />
            {errors.booker_email && <span>This field is required</span>}
          </div>

          <div className="flex max-w-md flex-col">
            <TextField label="Booker Phone" variant="outlined"
              {...register("booker_phone", { required: true })} />
            {errors.booker_phone && <span className="text-sm text-red-500">This field is required</span>}
          </div>

          <div className="flex max-w-md flex-col">
            <TextField label="Add a special requist" variant="outlined"
              {...register("booker_request", {
                maxLength: 100,
                // message: "Max Char is 100"
              })} />
            {errors.booker_request && <span className="text-sm text-red-500">This field is required</span>}
          </div>
          {/* CheckBox Section */}
          <div className="flex items-center gap-4">
            <Checkbox defaultChecked />
            <h1>Accecpt All Terms and Condition</h1>
          </div>
          <button type="submit" className="bg-red-600 px-5 py-2 col-span-2">Book Your Table</button>
        </form>
      </section>
      <section>
        {/* Right Section */}
      </section>


    </main>
  )
}
