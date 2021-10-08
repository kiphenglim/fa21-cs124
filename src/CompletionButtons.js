function CompletionButtons(props) {
  return props.anyCompletedTasks ? (
    <div className={"CompletionButtons"}>
      <button className={"ShowUncompletedButton"} onClick={props.onShowAllClick}>
        {props.showingAllTasks ? "Show Uncompleted Tasks" : "Show All Tasks"}
      </button>
      <button className={"RemoveCompletedButton"} onClick={props.onRemoveAllClick}>
        Remove Completed Tasks
      </button>
    </div>
  ) : <></>;
}

export default CompletionButtons;
