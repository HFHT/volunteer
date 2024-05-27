export function Authenticate({ setMode }: any) {
    return (
        <>
            <div>
                <div><h2>Authenticate</h2></div>
                <div onClick={() => setMode('signin')}>Sign In</div>
            </div>

        </>
    )
}