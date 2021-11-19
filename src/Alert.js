function Alert(props) {
    return <div className='backdrop'>
        <div className='modal'>{props.children}
            <div className='alert-buttons'>
                <div aria-label='Warning, your item will be permanrntly deleted,
                are you sure you want to delete item?'></div>
                <button className={'alert-button alert-cancel'}
                        aria-label={'cancel deletion'}
                        type={'button'}
                        onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={'alert-button alert-confirm'}
                        aria-label={'confirm deletion'}
                        type={'button'}
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
