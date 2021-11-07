
function ListMenuItem(props) {
    return (
        <div>
            <div className={'ListMenuItem'}>
                <div className={'list-menu-item-name'}>{props.listName}</div>
                <div>
                    <button className={'list-menu-item-delete'}
                        onClick={(e) => props.onDeleteList(props.id)}>Delete</button>
                    <button className={'list-menu-item-edit'}
                            onClick={(e) => props.onChangeDisplay(props.id)}>→</button>
                </div>
            </div>
            <hr/>
        </div>
    );
}

export default ListMenuItem;
