import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import "./NavBar.css";

export const NavBar = (props) => {
    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => setCollapsed(!collapsed);

    return (
        <div>
            <Navbar color="faded" light>
                <NavbarBrand href="/" className="RandomEncounters">RandomEncounters</NavbarBrand>
                <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                <Collapse isOpen={!collapsed} navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLink href="/">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/Encounters">Start Your Adventure!</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/encounters/customEncounterForm">Create Your Own Adventure!</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/encounters/EncounterRandomizer">Random Encounters</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/encounters/myEncounters">My Encounters</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/login"
                                onClick={
                                    () => {
                                        localStorage.removeItem("user")
                                    }}>Logout</NavLink>
                        </NavItem>

                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}
