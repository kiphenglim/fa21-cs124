function CompletionButtons(props) {
  return props.anyCompletedTasks ? (
    <div>
      <button onClick={props.onShowAllClick}>
        {props.showingAllTasks ? "Show Uncompleted Tasks" : "Show All Tasks"}
      </button>
      <button onClick={props.onRemoveAllClick}>
        Remove Completed Tasks
      </button>
    </div>
  ) : <></>;
}

export default CompletionButtons;
