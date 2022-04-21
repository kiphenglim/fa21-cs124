import trashcan from './trashcan.png';

function SharedUsers(props) {
  return props.emails.map((email) => (
    <div>
      {email}
      <button className={'ListMenuDelete'}
        aria-label={props.listName + ' remove editor'}
        tabIndex={props.disableTab ? -1 : 0}
        onClick={() => props.removeEditor(email)}>
        <img className={'SharedUserDelete'}
          src={trashcan}
          alt={props.listName + ' remove editor'}
          width={14}
          height={14}
        />
      </button>
    </div>
  ))
}

export default SharedUsers;
