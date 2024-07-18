const DEFAULT_LOCATION = { lat: 32.270676, lng: -110.952776 }

export async function getLocation() {
    var loc = DEFAULT_LOCATION
    const handleResponse = (pos: any) => {
        if (pos) {
            loc.lat = pos.coords.latitude
            loc.lng = pos.coords.longitude
        } else {
            errMsg = { color: 'red', title: '🛜 No location information', message: 'Could not obtain location information, using default location.' }
        }
    }

    const handleErrors = (err: any) => {
        switch (err.code) {
            case err.PERMISSION_DENIED: errMsg = setMsg('Your web browser did not share location data, please update your settings')
                break
            case err.POSITION_UNAVAILABLE: errMsg = setMsg('Your web browser could not detect your current position')
                break
            case err.TIMEOUT: errMsg = setMsg('Your web browser timed out trying to detect your current position')
                break
            default: errMsg = setMsg('Your web browser failed to detect your current position')
                break
        }
        function setMsg(thisMsg:string) {
            return {color: 'orange', title: '🛜 No geolocation support', message: thisMsg }
        }
    }

    let errMsg = undefined
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(handleResponse, handleErrors, { timeout: 5000 })
    }
    else {
        errMsg = { color: 'orange', title: '🛜 No geolocation support', message: 'Your web browser does not support geolocation, using default location.' }
    }

    return {loc, errMsg}
}
