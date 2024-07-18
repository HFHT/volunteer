const DEFAULT_LOCATION = { lat: 32.270676, lng: -110.952776 }

export async function getLocation() {
    if (!navigator.geolocation) {
            return { loc: DEFAULT_LOCATION, errMsg: { color: 'orange', title: '🛜 No geolocation support', message: 'Your web browser does not support geolocation, using default location.' }}
    }
    try {
        const position: any = await getCurrentPosition()
        console.log(position)
        return { loc: { lat: position.coords.latitude, lng: position.coords.longitude }, errMsg: undefined }
    } catch (error) {
        console.log(error)
        return { loc: DEFAULT_LOCATION, errMsg: whichError(error)}
    }

    function getCurrentPosition() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                position => resolve(position),
                error => reject(error)
            )
        })
    }

    function whichError(err: any) {
        let errMsg = undefined
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
        return errMsg
        function setMsg(thisMsg: string) {
            return { color: 'orange', title: '🛜 No geolocation support', message: thisMsg }
        }

    }
}
