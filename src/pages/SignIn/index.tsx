export function SignIn({locations}:any) {
    return (
        <>
            <div>
                <div>
                    <div><h2>Record Time</h2></div>
                    <div>
                        <button>Check In</button>
                        <button>Check Out</button>
                    </div>
                    <div>
                        <select>
                            <option>Home...</option>
                        </select>
                    </div>
                    <div>
                        <select>
                            <option>Event...</option>
                        </select>
                    </div>
                    <div>
                        <select>
                            <option>Activity...</option>
                        </select>
                    </div>
                    <div>Hours</div>
                    <div><input type='date' /></div>
                    <div><input type='time' /></div>
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