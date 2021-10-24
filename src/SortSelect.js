function SortSelect(props) {
    return (
        <div className={'sort-header'}>
            <div className={'sort-select'}>
                <label htmlFor={'sort-select'} className={'sort-label'}>Sort By</label>
                <select className={'sort-menu'}
                  onChange={props.onChange}
                  value={props.sortBy}>
                    <option value={'created'}>Date</option>
                    <option value={'task'}>Name</option>
                    <option value={'priority'}>Priority</option>
                </select>
            </div>
            <span className={'priority-header'}>Priority</span>
        </div>
    )
}

export default SortSelect;
