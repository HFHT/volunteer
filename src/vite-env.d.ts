/// <reference types="vite/client" />
interface IControls {
    _id: string
    blocks: IBlocks[]
}

interface IuseMongo {
    connection: { url: string, collection: string, key: string }
    setter: Function
    noSave?: boolean
}
type propsT = {
    constituents: constituentT[]
    locations: locationT[]
    settings: settingsT[]
    coords: coordsT
    sas: {
        url: any
        sasKey: any
    } | null;
}
type settingsT = {
    _id: string
    a: string[]
}
type coordsT = {
    loc: {
        lat: number
        lng: number
    };
    errMsg: {
        color: string
        title: string
        message: string
    } | undefined
}
type constituentT = {
    _id: string
    type: 'vol' | 'admin'
    status: 'active' | 'inactive' | 'deceased'
    pin: string
    phone: string
    name: nameT
    place: placeT
    locs: locT[]
    activities: string[]
    hoursLife: number
    hoursYTD: number
    lastLogin: string
    logins: number
}

type nameT = {
    first: string
    last: string
}

type placeT = {}

type locT = {
    title: string
    lat: number
    lng: number
    distance?: number
}

type constituentHoursT = {
    _id: string
    h: hoursT[]
}

type hoursT = {
    _id: string
    day: string
    dur: number
    loc: string
    miles: number
    act: string
    in: string
    out: string
    ev: string
}

type locationT = {
    _id: string | number
    title: string
    lat: number
    lng: number
    custom: boolean
    status: 'active' | 'inactive' | 'archived'
    distance?: number
}