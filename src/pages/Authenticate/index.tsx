import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import { find_row } from "../../helpers";

interface AuthenticateI {
    constituents: constituentT[]
    setConstituent: Function
    setMode: Function
    phone: string
    setPhone: Function
}

export function Authenticate({ constituents, setConstituent, setMode, phone, setPhone }: AuthenticateI) {
    const [authPhone, setAuthPhone] = useState(phone)
    const [pin, setPin] = useState('')
    const [haveConstituent, setHaveConstituent] = useState<constituentT | undefined>(undefined)
    const handlePhoneChange = (p: string) => {
        setAuthPhone(p)
        if (p.length === 11) {
            setPhone(p)
            let thisConstituent: constituentT | undefined = find_row('phone', p, constituents)
            if (!thisConstituent) {
                alert('Phone number not authorized!')
            } else {
                console.log('Authenticate', thisConstituent)
                setHaveConstituent(thisConstituent)
            }
            //locate the constituent, enable the pin field, wait for pin to match.
        }

    }
    const handlePin = (p: string) => {
        if (!haveConstituent) return
        setPin(p)
        console.log(p,haveConstituent)
        if (p === haveConstituent.pin) {
            setConstituent(haveConstituent)
            setMode('signin')
        }
    }
    return (
        <>
            <div>
                <div><h2>Authenticate</h2></div>
                <div className='pickphone'>
                    <PhoneInput
                        country={'us'}
                        value={authPhone}
                        inputClass='pickphoneinput'
                        onChange={(p: any) => handlePhoneChange(p)}
                    />
                </div>
                {phone && <div><input type='number' value={pin} onChange={(e) => handlePin(e.target.value)} placeholder='...pin' title="pin" /></div>}

                {/* <div onClick={() => { setMode('signin'); setConstituent(constituents[0]) }}>Sign In</div> */}
            </div>

        </>
    )
}