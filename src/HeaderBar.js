function HeaderBar(props) {
  return <div>
    <p>Welcome, {props.userEmail} ({props.userId})</p>
    <button
      onClick={() => props.auth.signOut()}
      type="button"
    >
      Logout
    </button>
  </div>
}

export default HeaderBar;
