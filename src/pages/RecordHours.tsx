
// Have activities and locations being loaded.
// Next refactor updating the form and saving.

import { useConstituent, useParams, useVolunteerHours } from "../hooks"
import { NativeSelect } from "@mantine/core"
import { IconCirclePlus } from "@tabler/icons-react"
import TodaysActivities from "../components/RecordHours/TodaysActivities";
import { RecordTime } from "../components";

interface RecordHoursInterface {
    props: propsT
}
const INACTIVE = false          // future - have a control that allows Inactive locations.

export function RecordHours({ props }: RecordHoursInterface) {
    const params = useParams(['nosave', 'noemail']) // noprint: do not print hang tags; noprice: do not reprice items
    const [constituent] = useConstituent(props, INACTIVE)
    const [hours, , fetch, , isBusy] = useVolunteerHours({ _id: constituent.info?._id, connection: { url: import.meta.env.VITE_MONGO_URL, collection: 'Hours', key: '_id' }, noSave: params.nosave })

    return (
        <>
            <RecordTime constituent={constituent} refreshActivities={() => fetch(constituent.info?._id)} />
            <TodaysActivities hours={hours} />
        </>
    )
}

function Events() {
    return (
        <div>
            <select title="events">
                <option>Event...</option>
            </select>
            <button type="button">Sign-up</button>
        </div>
    )
}
