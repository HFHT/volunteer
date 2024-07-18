import { useEffect, useState } from "react"
import { dateFormat, fetchJson, find_id, find_row } from "../helpers"
interface IuseVolHours {
    _id: string | undefined
    connection: { url: string, collection: string, key: string }
    noSave: boolean
}
export function useVolunteerHours({ _id, connection, noSave = false }: IuseVolHours) {
    const [volunteerHours, setVolunteerHours] = useState<hoursT[] | undefined>()
    const [openRecord, setOpenRecord] = useState<{ idx: number, r: hoursT } | null>(null)
    const [isBusy, setIsBusy] = useState(false)

    useEffect(() => {
        if (!_id) return
        fetch(_id)
    }, [_id])

    const fetch = async (_id: string | undefined) => {
        if (!_id) return undefined
        const header: any = { method: "POST", headers: new Headers() }
        header.body = JSON.stringify({ method: 'find', db: 'Volunteer', collection: connection.collection, find: _id ? { _id: _id } : {} })
        setIsBusy(true)
        let response = await fetchJson(connection.url, header)
        if (response.length < 1) {
            setVolunteerHours([])
        } else {
            setOpenRecord(hasOpenRecord(response[0].h))
            setVolunteerHours(response[0].h)
        }
        setIsBusy(false)
    }

    const mutate = async (_id: string | undefined, hours: hoursT[]) => {
        console.log('useVolunteerHours-mutate', _id, hours)
        if (!_id || !hours) return undefined
        setIsBusy(true)
        const header: any = { method: "POST", headers: new Headers() }
        header.body = JSON.stringify({ method: 'updateOne', db: 'Volunteer', collection: connection.collection, data: { _id: _id, h: hours }, find: { _id: _id } })
        if (!noSave) {
            let response = await fetchJson(connection.url, header)
            console.log('fetchJson response', response)
            fetch(_id)
        }
        setIsBusy(false)
    }

    return [volunteerHours, openRecord, fetch, mutate, isBusy] as const

    function hasOpenRecord(theRecords: hoursT[]) {
        console.log(theRecords, dateFormat(null))
        let today = dateFormat(null)
        let result = theRecords.filter((h: hoursT) => (h.day === today) && (h.out === ''))
        if (result.length === 0) return null
        let resultIdx = theRecords.findIndex((h: hoursT) => (h.day === today) && (h.in === result[0].in))
        console.log(result, resultIdx)
        if (resultIdx > -1 && theRecords[resultIdx].out === '') {
            return { idx: resultIdx, r: theRecords[resultIdx] }
        }
        return null
    }
}