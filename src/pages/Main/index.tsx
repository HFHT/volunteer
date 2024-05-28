import { useMemo, useState } from "react"
import { Controls } from "../../components"
import { Authenticate, History, SignIn, SignUp } from ".."
import { find_row } from "../../helpers"

interface MainI {
    sas: any
    constituents: constituentT[]
    locations: locationT[]
    settings: any
}

export function Main({ sas, constituents, locations, settings }: MainI) {
    console.log(sas, settings)
    const [mode, setMode] = useState('authenticate')
    const [constituent, setConstituent] = useState<constituentT | null>(null)
    const [phone, setPhone] = useState<string>('')
    const activities = useMemo(() => find_row('_id', 'activities', settings), [settings])
    return (
        <>
            <Controls setMode={(e: string) => setMode(e)} />
            {mode === 'authenticate' && <Authenticate constituents={constituents} setConstituent={(c: constituentT) => setConstituent(c)} phone={phone} setPhone={(p: string) => setPhone(p)} setMode={(m: string) => setMode(m)} />}

            {mode === 'signin' && <SignIn constituent={constituent} locations={locations} activities={activities && activities[0]} />}
            {mode === 'signup' && <SignUp />}
            {mode === 'history' && <History />}

        </>
    )
}