import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { times } from "@/data";

interface Times {
  displayTime: string;
  avalibility: boolean;
  date:string
}

export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();
  const { selectedDate, selectedTime, person, id, slug, table } = reqBody;

  if (!selectedDate || !selectedTime || !person) {
    return NextResponse.json({ message: "invalid Quary" });
  }
     const tableRequired=Math.ceil(Number(person)/4)
   
     
  const allBookingOndate = await prisma.booking.findMany({
    where: {
      booking_date: selectedDate,
      slug: slug,
    },
    // select: {
    //   booking_time: true,
    //   no_of_table: true,
    // },
  });

  const avaliableTime = times.find((t) => t.time === selectedTime)?.searchTimes;
  if(!avaliableTime ) return


  let returntimeWithAvalibility: Times[] = [];
    const bookingSlat = avaliableTime.map((t) => {
      const tableBookedBasedonSearchTime = allBookingOndate.filter(
        (booking) => {
          if (booking.booking_time === t) {
            return booking;
          }
        }
      );
      const bookedtable = tableBookedBasedonSearchTime.reduce((acc, obj) => {
        return acc + obj.no_of_table;
      }, 0);

      let avaliable = false;
      if (tableRequired <= table - bookedtable) {
        avaliable = true;
      }
      returntimeWithAvalibility.push({
        displayTime: t,
        avalibility: avaliable,
        date:selectedDate
      });
    });

    
 
  
  return NextResponse.json({ returntimeWithAvalibility });
}
