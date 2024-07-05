import { act, useEffect, useState } from "react"
import { SpinnerModal } from "../../components"
import { useLocation, useParams, useVolunteerHours } from "../../hooks"
import { dateFormat, timeAdd, timeDiff, timeFormat } from "../../helpers"
import { CirclePlus } from "../../icons/InfoIcon"

interface SignInI {
    constituent: constituentT
    locations: locationT[]
    activities: string[]
    toast: Function
}

export function SignIn({ constituent, locations, activities, toast }: SignInI) {
    const params = useParams(['nosave', 'noemail']) // noprint: do not print hang tags; noprice: do not reprice items
    const [_formFields, set_FormFields] = useState({ location: '', activity: '', date: dateFormat(null), time: timeFormat(null), hours: 0 })
    const [volunteerHours, openRecord, fetchHours, updateHours, isBusy] = useVolunteerHours({ connection: { url: import.meta.env.VITE_MONGO_URL, collection: 'Hours', key: '_id' }, noSave: params.nosave })
    const [coords, closest, getCoords] = useLocation(toast, locations, constituent.locs)

    useEffect(() => {
        console.log('constituent-useEffect', volunteerHours, constituent)
        !volunteerHours && fetchHours(constituent?._id)
    }, [constituent])
    useEffect(() => {
        closest && openRecord === null && set_FormFields({ ..._formFields, location: closest?.closest.title })
    }, [closest, openRecord])

    useEffect(() => {
        console.log('openRecord-useEffect', volunteerHours, constituent, openRecord)
        if (openRecord !== null) {
            console.log('openRecord-notnull', openRecord)
            set_FormFields({
                location: openRecord.r.loc,
                activity: openRecord.r.act,
                date: openRecord.r.day,
                time: timeFormat(null),
                hours: timeDiff(openRecord.r.in, null)
            })
        }
        !volunteerHours && fetchHours(constituent?._id)
    }, [openRecord])
    const handleCheckIn = () => {
        if (!volunteerHours) return
        if (formHasErrors(_formFields, toast)) return
        let allHours = [...volunteerHours, {
            day: _formFields.date,
            act: _formFields.activity,
            loc: _formFields.location,
            in: _formFields.time,
            out: '',
            dur: 0,
            miles: 0,
            ev: ''
        }]
        updateHours(constituent?._id, allHours)
    }
    const handleCheckOut = () => {
        if (!volunteerHours) return
        if (_formFields.time === '') { toast('A time is required!'); return true }
        let checkOutHours = { ...openRecord!.r, out: timeAdd(openRecord!.r.in, _formFields.hours), dur: _formFields.hours, miles: 0 }
        let allHours = volunteerHours
        console.log(timeAdd(openRecord!.r.in, _formFields.hours))
        allHours[openRecord!.idx] = checkOutHours
        updateHours(constituent?._id, allHours)
        set_FormFields({ location: '', activity: '', date: dateFormat(null), time: timeFormat(null), hours: 0 })
    }
    const handleRefresh = () => {
        let dur = openRecord ? timeDiff(openRecord.r.in, null) : 0
        set_FormFields({ ..._formFields, date: dateFormat(null), time: timeFormat(null), hours: dur })
    }
    const formHasErrors = (theForm: any, toast: Function) => {
        if (theForm.location === '') { toast('A location is required!'); return true }
        if (theForm.activity === '') { toast('An activity is required!'); return true }
        if (theForm.date === '') { toast('A date is required!'); return true }
        if (theForm.time === '') { toast('A time is required!'); return true }
        return false
    }
    return (
        <>
            <SpinnerModal isLoading={isBusy} text={isBusy ? 'Working...' : ''} />

            <div>
                <div>
                    <div><h2>Record Time</h2></div>
                    <div className='flex space-between'>
                        <button type="button" disabled={openRecord !== null} onClick={handleCheckIn}>Check In</button>
                        <button type="button" disabled={openRecord === null} onClick={handleCheckOut}>Check Out</button>
                        <button type="button" onClick={handleRefresh}>Refresh</button>
                    </div>
                    <hr />
                    <Locations locations={closest ? closest.order : []} selected={[_formFields.location, (e: any) => set_FormFields({ ..._formFields, location: e })]} />
                    {/* <Events /> */}
                    <Activities activities={activities} chosen={constituent ? constituent.activities : []} selected={[_formFields.activity, (e: any) => set_FormFields({ ..._formFields, activity: e })]} />
                    <div className='flex space-around'>
                        <div><input type='date' value={_formFields.date} onChange={(e: any) => set_FormFields({ ..._formFields, date: e.target.value })} title="date" /></div>
                        <div><input type='time' value={_formFields.time} onChange={(e: any) => set_FormFields({ ..._formFields, time: e.target.value })} title="time" /></div>
                    </div>
                    <hr />
                    <h3>Hours</h3>

                    <div className='flex space-around'>
                        <div className='flex'>
                            <div><input type='number' value={_formFields.hours} onChange={(e: any) => set_FormFields({ ..._formFields, hours: e.target.value })} title="time" className='hours' /></div>
                            <div><input type='range' min="0" max="24" step="0.25" value={_formFields.hours} onChange={(e: any) => set_FormFields({ ..._formFields, hours: e.target.value })} title="hours" className='slider' /></div>
                        </div>
                    </div>

                </div>
                <div>
                    <hr />
                    <div><h2>Today's Activities</h2></div>
                    {volunteerHours && volunteerHours.filter((h: hoursT) => (h.day === dateFormat(null))).map((d: hoursT, idx: number) => (
                        <TodayActivities activity={d} key={idx} />
                    ))}
                </div>
            </div>
        </>
    )
}
interface LocationI {
    locations: locT[]
    selected: [string, Function]
}
function Locations({ locations, selected }: LocationI) {
    const optionTitle = (loc: locT) => {
        return `${loc.title} (${(loc.distance && loc.distance > 99) ? '--' : `${loc.distance} miles`})`
    }
    return (
        <div className='flex space-between'>
            <select value={selected[0]} onChange={(e: any) => selected[1](e.target.value)} title="locations">
                <option value=''>...Location</option>
                {locations && locations.map((l: locT, li: number) => (
                    <option value={l.title} key={`l${li}`}>{optionTitle(l)}</option>
                ))}
            </select>
            <div className='button' onClick={()=>{alert('Add location coming soon.')}}><CirclePlus /></div>
        </div>
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
interface ActivitiesI {
    activities: string[]
    chosen: string[]
    selected: [string, Function]
}
function Activities({ activities, chosen, selected }: ActivitiesI) {
    return (
        <div className='flex space-between'>
            <select value={selected[0]} onChange={(e: any) => selected[1](e.target.value)} title="activities">
                <option>...Activity</option>
                {chosen && chosen.map((p: string, pi: number) => (
                    <option key={`p${pi}`}>{p}</option>
                ))}
            </select>
            <div className='button' onClick={()=>{alert('Add activity coming soon.')}}><CirclePlus /></div>
        </div>
    )
}
interface TodayActivitiesI {
    activity: hoursT
}
function TodayActivities({ activity }: TodayActivitiesI) {
    return (
        <div>
            <div>{activity.act} @ {activity.loc}</div>
            <div>Date: {activity.day}</div>
            {activity.out ?
                <div>Check In: {activity.in} Check Out {activity.out}  Hours: {activity.dur}</div>
                :
                <div>Check In: {activity.in} </div>
            }
        </div>
    )
}