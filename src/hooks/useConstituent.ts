import { useLocalStorage } from "@mantine/hooks"
import { act, useEffect, useMemo, useState } from "react"
import { mergeSortActivities, mergeSortLocations } from "../helpers"

export const useConstituent = (props: propsT, inactive: boolean = false) => {
    const { constituents, locations, coords } = props
    const [_constituent, set_constituent] = useState<constituentT | undefined>()
    const [_constituentActivities, set_constituentActivities] = useState<string[] | undefined>()
    const [_constituentLocations, set_constituentLocations] = useState<locT[] | undefined>([])
    const [busy, setBusy] = useState(false)
    const [auth] = useLocalStorage<{ id: string, expires: string }>({ key: 'auth' })
    const activities = useMemo(() => props.settings.find((f: any) => f._id === 'activities'), [props])

    useEffect(() => {
        console.log('useConstituent-useEffect', props, auth, constituents, activities, locations)
        if (!props || !auth || !constituents || !activities || !locations) return
        initialize()
    }, [props, auth, constituents, activities])

    async function initialize() {
        const idx = constituents.findIndex((c) => auth.id === c._id)
        set_constituent(constituents[idx])
        set_constituentActivities(mergeSortActivities(constituents[idx].activities, activities))
        set_constituentLocations(mergeSortLocations(constituents[idx].locs, locations, coords, inactive))
    }
    function fetch() {

    }

    function save() {

    }

    return [
        { info: _constituent, activities: _constituentActivities, locations: _constituentLocations },
        fetch, save, busy
    ] as const



}
