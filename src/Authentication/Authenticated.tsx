import { useLocalStorage } from "@mantine/hooks"
import { dateDiff, dateFormat } from "../helpers"
import { Notifications } from '@mantine/notifications';
import SignIn from "./SignIn";

export function Authenticated({ children, constituents }: any) {
    const [auth] = useLocalStorage({ key: 'auth', defaultValue: { id: '', expires: dateFormat(null) } })
    let daysTillExpire = dateDiff(auth.expires, dateFormat(null))
    !daysTillExpire && (daysTillExpire = 0)
    console.log(auth, dateFormat(null), dateDiff(auth.expires, dateFormat(null)))
    const Authenticate = () => {
        console.log(daysTillExpire)
        if (daysTillExpire > 0) {
            return (<>{children}</>)
        } else {
            return (<><SignIn constituents={constituents} /></>)
        }
    }
    return (
        <>
            <Notifications position="top-right" />
            <Authenticate />
        </>
    )
}
