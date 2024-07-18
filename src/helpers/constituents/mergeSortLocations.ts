import { getDistance } from "../gps"

export function mergeSortLocations(constituentLocs: any, locations: any, coords: coordsT, inactive: boolean = false) {
    console.log('mergeSortActivities', constituentLocs, locations, inactive)
    if (!constituentLocs || !coords) return locations
    let mergedLocs = constituentLocs.concat(locations)
    if (!inactive) {
        console.log('mergeSortActivities-filter', constituentLocs, locations)
        mergedLocs = mergedLocs.filter((loc: locationT) => (loc.status !== 'inactive'))
    }
    mergedLocs = mergedLocs.map((loc: locationT) => ({ ...loc, distance: getDistance(coords.loc, {lat: loc.lat, lng: loc.lng}) }))
    // @ts-ignore       prior line of code adds a distance to every location.
    mergedLocs = mergedLocs.sort((a:locationT, b:locationT) => a.distance - b.distance)
    return mergedLocs
}
