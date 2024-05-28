import { useState } from "react"
import PhoneInput from "react-phone-input-2";

interface SignInI {
    constituent: constituentT | null
    locations: locationT[]
    activities: string[]
}

export function SignIn({constituent, locations, activities}:SignInI) {
    const [_formFields, set_FormFields] = useState()
    return (
        <>
            <div>
                <div>
                    <div><h2>Record Time</h2></div>
                    <div>
                        <button type="button">Check In</button>
                        <button type="button">Check Out</button>
                    </div>
                    <div>
                        <select title="locations">
                            <option>Home...</option>
                        </select>
                    </div>
                    <div>
                        <select title="events">
                            <option>Event...</option>
                        </select>
                    </div>
                    <div>
                        <select title="activities">
                            <option>Activity...</option>
                        </select>
                    </div>
                    <div>Hours</div>
                    <div><input type='date'  title="date"/></div>
                    <div><input type='time'  title="time"/></div>
                </div>
                <div>
                    <div><h2>Today's Activities</h2></div>
                    <div>
                            <div>Programming @ Your Home</div>
                            <div>Date: 2024-05-27</div>
                            <div>Check In: 09:04 Check Out 13:19  Hours: 4.25</div>
                    </div>
                </div>
            </div>
        </>
    )
}