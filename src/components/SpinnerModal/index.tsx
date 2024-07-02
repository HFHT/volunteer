import './spinnermodal.css';

export function SpinnerModal({ isLoading, text = 'Loading...' }: any) {
    return (
        <>
            <div style={{ display: isLoading ? 'flex' : 'none' }} className='spinner-modal'>
                <div className='spinner-content'>
                    <div className='spinner-loader'></div>
                    <div className='spinner-text'>{text}</div>
                </div>
            </div>
        </>
    );
}