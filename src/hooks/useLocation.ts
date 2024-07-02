import { useEffect, useState } from 'react'
import { getDistance } from '../helpers'
export function useLocation(toast: any, locations: locationT[], personal: locT[]) {
    const [_location, set_Location] = useState<{ lat: number, lng: number }>()
    const [_closest, set_Closest] = useState<{ closest: locT, order: locT[] }>()
    function getLocation() {
        var response = { lat: 32.270676, lng: -110.952776 }
        const handleResponse = (pos: any) => {
            if (pos) {
                response.lat = pos.coords.latitude
                response.lng = pos.coords.longitude
            } else {
                toast.error('Could not obtain location information, using default location.')
            }
            let closest = sequenceLocations(locations, personal, response)
            set_Location(response)
            set_Closest(closest)
            toast.info(`Closest location is ${closest.closest.title}`)
        }
        const handleErrors = (err: any) => {
            switch (err.code) {
                case err.PERMISSION_DENIED: toast("Your web browser did not share location data, please update your settings")
                    break
                case err.POSITION_UNAVAILABLE: toast("Your web browser could not detect your current position")
                    break
                case err.TIMEOUT: toast("Your web browser timed out trying to detect your current position")
                    break
                default: toast("Your web browser failed to detect your current position")
                    break
            }
            set_Location(response)
        }
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(handleResponse, handleErrors, { timeout: 5000 })
        }
        else {
            toast.warn('Your web browser does not support geolocation, using default location.')
        }

    }
    useEffect(() => {
        console.log('useLocation-useEffect', personal)

        !_location && getLocation()

    }, [])

    return [_location, _closest, getLocation] as const

    function sequenceLocations(theLocations: locationT[], thePersonal: locT[], pos1: { lat: number, lng: number }): { closest: locationT, order: locationT[] } {
        let activeLocs = theLocations.filter((f: locationT) => f.status === 'active')
        let locs: any = [...activeLocs, ...thePersonal]
        console.log(locs)
        for (var i = 0; i < locs.length; i++) {
            let pos2 = { lat: locs[i].lat, lng: locs[i].lng }
            let distance = getDistance(pos1, pos2)
            locs[i] = { ...locs[i], distance }
        }
        //@ts-ignore
        locs.sort((a, b) => a.distance - b.distance)
        return { closest: locs[0], order: locs }
    }
}



