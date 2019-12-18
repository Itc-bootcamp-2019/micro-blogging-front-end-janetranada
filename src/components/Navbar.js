import React from 'react'
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li className="navbar-list-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="navbar-list-item">
                    <Link to="/user">Profile</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;