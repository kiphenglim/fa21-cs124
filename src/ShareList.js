function ShareList(props) {
    return <div className='backdrop'>
        <div className='modal'> {props.children}
            <div className='alert-buttons'>
                <button className={'alert-button alert-cancel'}
                        aria-label={'return to my lists'}
                        type={'button'}
                        onClick={() => { props.onCancel(null); }}>
                    Cancel
                </button>
                <button className={'alert-button alert-cancel'}
                        aria-label={'share'}
                        type={'button'}
                        onClick={() => {
                            props.onConfirm(null);
                            props.onCancel(null);
                        }}>
                    Share
                </button>
            </div>
        </div>
    </div>
}

export default ShareList;
