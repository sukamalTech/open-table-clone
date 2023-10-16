import { times } from "@/data"
export function printDisplayTime(time:string | null){
const displayTime = times.find((t)=>t.time===time)?.displayTime

    return displayTime
}
export function printDisplayDate(date:string |null){
    if( date===null) return "Null"
    const d = new Date(date)
    const d1=d.toString().split(" ")
   
    return `${d1[0]} ${d1[1]} ${d1[2]} ${d1[3]}`
}
