import trashcan from './trashcan.png'

function ListMenuItem(props) {
    return (
        <div>
            <div className={'ListMenuItem'}>
                <div className={'list-menu-item-name'}>{props.listName}</div>
                <button className={'ListMenuDelete'}
                        onClick={(e) => props.onDeleteList(props.id)}>
                    <img className={'DeleteIcon'}
                         src={trashcan}
                         alt='delete list'
                         width={15}
                         height={15}
                    />
                </button>
                <button className={'list-menu-item-edit'}
                        onClick={(e) => props.onChangeDisplay(props.id)}>→</button>

            </div>
            <hr/>
        </div>
    );
}

export default ListMenuItem;
