import next from './next.png'
import trashcan from './trashcan.png'

function ListMenuItem(props) {
    return (
        <div>
            <div className={'ListMenuItem'}>
                <div className={'list-menu-item-name'}>{props.listName}</div>
                <div className={'ListMenuButtons'}>
                    <button className={'ListMenuDelete'}
                            onClick={(e) => props.onDeleteList(props.id)}>
                        <img className={'DeleteIcon'}
                             src={trashcan}
                             alt='delete list'
                             width={14}
                             height={14}
                        />
                    </button>
                    <button className={'ListMenuNext'}
                        onClick={(e) => props.onChangeDisplay(props.id)}>
                        <img className={'NextIcon'}
                            src={next}
                            alt='edit list'
                             width={14}
                             height={14}
                        />
                    </button>
                </div>
            </div>
            <hr/>
        </div>
    );
}

export default ListMenuItem;
