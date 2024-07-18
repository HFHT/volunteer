import { useLocalStorage } from "@mantine/hooks";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import { notifications } from '@mantine/notifications';
import { dateAdjust, dateFormat } from "../helpers";
import { PinInput } from "@mantine/core";


interface SignInInterface {
    constituents: constituentT[]
}
export default function SignIn({ constituents }: SignInInterface) {
    const [auth, setAuth] = useLocalStorage<{ id: String, expires: string }>({ key: 'auth' })
    const [phone, setPhone] = useState<string | undefined>()

    let thisConstituent = undefined
    const handlePhone = (p: string) => {
        if (p.length === 11) {
            console.log('got phone', Number(p), Number(constituents[0].phone))
            thisConstituent = constituents.find((c: any) => p === c.phone)
            console.log(thisConstituent)
            if (!thisConstituent) {
                notifications.show({ color: 'blue', title: '📵 Not Found', message: 'The phone number was not found! ' })
            } else {
                setAuth({ id: thisConstituent._id, expires: dateAdjust({ date: dateFormat(null), adjust: 60 }) })
            }
        }
        setPhone(p)
    }

    return (
        <>
            <div className='pickphone'>
                <PhoneInput
                    country={'us'}
                    value={phone}
                    inputClass='pickphoneinput'
                    onBlur={({ target }) => target.focus()}
                    onChange={(e: any) => handlePhone(e)}
                />
            </div>
            {thisConstituent && <PinInput />}
        </>
    )
}
