function Alert(props) {
    return <div className='backdrop'>
        <div className='modal'>{props.children}
            <div className='alert-buttons'>
                <button className={'alert-button alert-cancel'} type={'button'}
                        onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={'alert-button alert-confirm'} type={'button'}
                        onClick={() => {
                            props.onConfirm();
                            props.onCancel();
                        }}>
                    Confirm
                </button>
            </div>
        </div>
    </div>



}

export default Alert;
