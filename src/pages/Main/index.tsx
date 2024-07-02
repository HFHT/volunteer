import { useMemo, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { Controls } from "../../components"
import { Authenticate, History, SignIn, SignUp } from ".."
import { find_row } from "../../helpers"
import { useLocation, useOnline } from "../../hooks"

interface MainI {
    sas: any
    constituents: constituentT[]
    locations: locationT[]
    settings: any
}

export function Main({ sas, constituents, locations, settings }: MainI) {
    const isOnline = useOnline({ online: [handleOnline], offline: [handleOffline] });

    console.log(sas, settings)
    const [mode, setMode] = useState('authenticate')
    const [_constituent, set_Constituent] = useState<constituentT | null>(null)
    const [phone, setPhone] = useState<string>('')

    // const [refreshSchedule, updateSchedule, isFetching] = useMongo({ connection: { url: import.meta.env.VITE_MONGO_URL, collection: 'Schedule', key: '_id' }, setter: set_Constituent, noSave: params.nosave })
    // const [doSaveStop, hasError, isSaving] = useSaveConstituent('2024-05-28', updateSchedule, toast)

    const activities = useMemo(() => find_row('_id', 'activities', settings), [settings])

    function handleOnline() {
        toast.info('You are back online.', { autoClose: 6000, position: 'top-center' })
    };

    function handleOffline() {
        toast.error('Connection to the network has been lost. Application is now in READ ONLY mode!', { autoClose: 10000, position: 'top-center' })
    };

    return (
        <>
            <ToastContainer position="top-left" className='mytoast' autoClose={2100} hideProgressBar={true} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />

            <Controls setMode={(e: string) => setMode(e)} online={isOnline} />
            {mode === 'authenticate' && <Authenticate constituents={constituents} setConstituent={(c: constituentT) => set_Constituent(c)} phone={phone} setPhone={(p: string) => setPhone(p)} setMode={(m: string) => setMode(m)} toast={toast} />}

            {mode === 'signin' && _constituent && <SignIn constituent={_constituent} locations={locations} activities={activities && activities[0]} toast={toast} />}
            {mode === 'signup' && <SignUp />}
            {mode === 'history' && <History />}

        </>
    )
}