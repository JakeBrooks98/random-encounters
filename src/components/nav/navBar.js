import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = (props) => {
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">Home</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/Encounters">Start Your Adventure!</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/encounters/customEncounterForm">Create Your Own Adventure!</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/encounters/myEncounters">My Encounters</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="#"
                onClick= {
                    () => {
                        localStorage.removeItem("user")
                    }
                }>
                    Logout
                    </Link>
            </li>
        </ul>
    )
}