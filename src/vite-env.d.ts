/// <reference types="vite/client" />
interface IControls {
    _id: string
    blocks: IBlocks[]
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
    hours: hoursT
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
}

type hoursT = {
    day: string
    dur: number
    loc: string | number
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

}