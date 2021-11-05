function SortSelect(props) {
    return (
        <div className='SortHeader'>
            <div className={'SortSelect'}>
                <label htmlFor={'SortSelect'} className={'SortLabel'}>Sort By</label>
                <select className={'SortMenu'}
                  onChange={props.onChange}
                  value={props.sortBy}>
                    <option value={'created'}>Date</option>
                    <option value={'task'}>Name</option>
                    <option value={'priority'}>Priority</option>
                </select>
            </div>
            <span className={'PriorityHeader'}>Priority</span>
        </div>
    )
}

export default SortSelect;
