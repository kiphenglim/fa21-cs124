function HeaderBar(props) {
  return <div className={'HeaderBar'}>
    <span>Welcome, {props.userEmail}</span>
    <button
      className={'HeaderBarLogout'}
      onClick={() => props.auth.signOut()}
      type="button"
    >
      Logout
    </button>
  </div>
}

export default HeaderBar;
