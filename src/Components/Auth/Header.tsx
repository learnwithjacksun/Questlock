import { Goback, ThemeToggle } from "../UI"

const Header = () => {
  return (
    <header className="layout flex items-center justify-between h-[60px]">
        <Goback/>
        <ThemeToggle/>
    </header>
  )
}

export default Header