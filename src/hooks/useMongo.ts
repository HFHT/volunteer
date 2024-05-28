import { useState } from "react"
import { fetchJson } from "../helpers"

interface IuseMongo {
    connection: { url: string, collection: string, key: string }
    setter: Function
    noSave?: boolean
}

export function useMongo({ connection, setter, noSave = false }: IuseMongo) {
    const [isLoading, setIsLoading] = useState(false)

    async function updateMongo(obj: any, insert: boolean = false, appt: string = '') {
        console.log('updateMongo', noSave, obj, insert, connection)
        if (!connection) return
        if (obj && obj.hasOwnProperty(connection.key)) {
            if (obj[connection.key] === '') {
                alert('Save of an appointment with a blank key was blocked!')
                return
            }
            setIsLoading(true)

            const header: any = { method: "POST", headers: new Headers() }
            header.body = JSON.stringify({ method: insert ? 'insertOne' : 'updateOne', db: 'Truck', collection: connection.collection, data: { ...obj }, find: insert ? {} : { _id: obj[connection.key] } })
            console.log('fetchJson headers', connection, obj, header)
            if (!noSave) {
                let response = await fetchJson(connection.url, header)
                console.log('fetchJson response', response)
            }
            await fetchMongo()
            setIsLoading(false)
        }
    }

    async function fetchMongo(_id?: string | null | undefined) {
        if (!connection) return
        const header: any = { method: "POST", headers: new Headers() }
        header.body = JSON.stringify({ method: 'find', db: 'Truck', collection: connection.collection, find: _id ? { _id: _id } : {} })
        let response = await fetchJson(connection.url, header)
        console.log('fetchMongo response', response)
        setter([...response])
    }
    return [fetchMongo, updateMongo, isLoading] as const
}