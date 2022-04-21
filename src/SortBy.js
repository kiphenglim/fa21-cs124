function SortBy(props) {
    return <div>
        <input
            className={"sort-check-"+props.checkText}
            onChange={props.handleCheckedChange}
            type="checkbox"
        />
        <label
            htmlFor={"sort-check-"+props.checkText}
            value={props.checkText}
        />
    </div>
}

export default SortBy;
