import logo from '../assets/chef-claude-icon.png'

export default function Header() {
  return (
    <header>
        <img className="logo" src={logo} alt="Chef Claude icon" />
        <h1>Claude Chef</h1>
    </header>
  )
}