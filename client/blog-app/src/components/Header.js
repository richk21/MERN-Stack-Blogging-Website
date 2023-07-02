import { Link } from "react-router-dom"

export default function Header(){
    return(
        <header>
            <Link to="/" className="logo">Blog</Link>
            <nav>
            <Link to='/Login'>Login</Link>
            <Link to='/Register'>Register</Link>
            </nav>
        </header>
    )
}