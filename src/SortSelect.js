function SortSelect(props) {
    return (
        <div className='SortHeader' aria-label={'change list sorting'}>
            <div className={'SortSelect'}>
                <label htmlFor={'SortSelect'} className={'SortLabel'}>Sort By</label>
                <select className={'SortMenu'}
                  onChange={props.onChange}
                  value={props.sortBy}>
                    <option value={'created'} aria-label={'sort by date created'}>Date</option>
                    <option value={'task'} aria-label={'sort by task name'}>Name</option>
                    <option value={'priority'} aria-label={'sort by task priority'}>Priority</option>
                </select>
            </div>
            <span className={'PriorityHeader'} aria-label={''}>Priority</span>
        </div>
    )
}

export default SortSelect;
