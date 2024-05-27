import { useState } from "react"
import { Controls } from "../../components"
import { Authenticate, History, SignIn, SignUp } from ".."

export function Main({ sas, constituents, locations, settings }: any) {
    console.log(sas, settings)
    const [mode, setMode] = useState('authenticate')
    const [authenticated, setAuthenticated] = useState(false)
    return (
        <>
            <Controls setMode={(e: string) => setMode(e)} />
            {mode === 'authenticate' && <Authenticate setMode={(e: string) => setMode(e)} />}

            {mode === 'signin' && <SignIn locations={locations} />}
            {mode === 'signup' && <SignUp />}
            {mode === 'history' && <History />}

        </>
    )
}