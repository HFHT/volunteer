import { useState } from 'react'
import { fetchDays, find_id } from '../helpers'

//
//Receives a constituent, refetches so it is current, updates constituent and/or hours
//
export function useSaveConstituent(schedDate: string, update: Function, toast: any) {
    const [hasError, setHasError] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    console.log('useSaveStop', schedDate)
    async function doSaveStop(theStop: any) {
        console.log('useSaveStop-doSaveStop', theStop)
        setHasError(false)
        setIsSaving(true)
        let theDay: any[] | undefined = await fetchDays([schedDate])
        if (theDay === undefined) {
            setHasError(true)
            setIsSaving(false)
            toast('Could not fetch schedule from database, please try again later!')
            return
        }
        const whichRow = find_id('id', theStop.id, theDay[0].c)
        if (whichRow < 0) {
            setHasError(true)
            setIsSaving(false)
            toast('Contact Support, invalid record (doSaveStop).')
            return
        }
        theDay[0].c[whichRow] = theStop
        console.log('useSaveStop-doSaveStop', theDay)
        await update(theDay[0])
        setIsSaving(false)
    }
    return [doSaveStop, hasError, isSaving] as const
}