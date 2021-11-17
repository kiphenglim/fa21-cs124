import Toggle from 'react-toggle';
import 'react-toggle/style.css';

function CompletionButtons(props) {
  return props.anyCompletedTasks ? (
    <div className={'CompletionButtons'}>
      <div className={'Toggle'}
           aria-label={props.showingAllTasks
               ? 'hide completed tasks'
               : 'show all tasks'}>
        <label className={'ShowAllToggleLabel'}
          htmlFor={'ShowAllToggle'}>
            Hide Completed Tasks
        </label>
        <Toggle
          className='ShowAllToggle'
          defaultChecked={false}
          icons={false}
          onChange={props.onShowAllClick} />
      </div>
      <br/>
      <button className={'RemoveCompletedButton'}
              aria-label={'remove all completed tasks'}
              onClick={props.onRemoveAllClick} >
        Remove All Completed Tasks
      </button>
    </div>
  ) : <></>;
}

export default CompletionButtons;
