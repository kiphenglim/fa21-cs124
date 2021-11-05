
function ListMenuItem(props) {
    return (
        <div>
            <div className={'ListMenuItem'}>
                <div className={'list-menu-item-name'}>{props.listName}</div>
                <button className={'list-menu-item-delete'}
                        onClick={(e) => props.onChangeDisplay(props.id)}>→</button>

            </div>
            <hr/>
        </div>
    );
}

export default ListMenuItem;