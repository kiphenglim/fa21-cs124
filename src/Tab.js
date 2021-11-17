function Tab(props) {
    const classNames = ['TabListItem'];

    if (props.activeTab === props.name) {
        classNames.push('TabListActive');
    }

    return (
        <button className={classNames.join(" ")}
                onClick={() => {props.setActiveTab(props.name)}}>
            {props.label}
        </button>
    )
}

export default Tab;
