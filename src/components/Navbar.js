import React from 'react'

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li className="navbar-list-item"><a className="selected" href="#">Home</a></li>
                <li className="navbar-list-item"><a className="" href="#">Profile</a></li>
            </ul>
        </nav>
    )
}

export default Navbar;