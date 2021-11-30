function HeaderBar(props) {
  return <div className={'HeaderBar'}>
    Welcome, {props.userEmail}
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
