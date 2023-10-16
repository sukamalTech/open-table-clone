import { times } from "@/data";
interface Times {
    displayTime: string,
      time: string,
      searchTimes:string[],
}
export function getOpeningTime(open_time: string, close_time: string) {
  let isUnderTimeframe=false;
  const openingTime :Times[]= [];
  times.map((time) => {
    if (time.time === open_time) {
        isUnderTimeframe=true
      
    }

    if (isUnderTimeframe) {
      openingTime.push(time);
    }
    if (time.time === close_time) {
        isUnderTimeframe=false
      }
  });
  
  return openingTime
}
