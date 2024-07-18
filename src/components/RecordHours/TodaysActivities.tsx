import { dateFormat } from "../../helpers"
import { ActivityLog } from "./ActivityLog"

interface TodayActivitiesI {
  hours: hoursT[] | undefined
}
export default function TodaysActivities({hours}:TodayActivitiesI) {
  return (
    <div>
      <hr />
      <div><h2>Today's Activities</h2></div>
      {hours && hours.filter((h: hoursT) => (h.day === dateFormat(null))).map((d: hoursT, idx: number) => (
        <ActivityLog activity={d} idx={idx} key={idx}/>
      ))}
    </div>
  )
}
