function HeaderBar(props) {
  return <div>
    <button
      onClick={() => props.auth.signOut()}
      type="button"
    >
      Logout
    </button>
  </div>
}

export default HeaderBar;
