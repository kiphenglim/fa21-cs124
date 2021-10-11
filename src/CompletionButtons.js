import Toggle from 'react-toggle';
import "react-toggle/style.css";

function CompletionButtons(props) {
  return props.anyCompletedTasks ? (
    <div className={"CompletionButtons"}>
      <div className={"Toggle"}>
        <label className={"ShowAllToggleLabel"}
          htmlFor={"ShowAllToggle"}>
            Show Uncompleted Items
        </label>
        <Toggle
          className="ShowAllToggle"
          defaultChecked={false}
          icons={false}
          onChange={props.onShowAllClick} />
      </div>
      <br/>
      <button className={"RemoveCompletedButton"} onClick={props.onRemoveAllClick}>
        Remove All Completed Tasks
      </button>
    </div>
  ) : <></>;
}

export default CompletionButtons;
