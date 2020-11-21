import React from 'react'
import { NavLink, NavLinkProps } from 'react-router-dom'

const Link = (props: NavLinkProps) => <NavLink {...props} exact={true} activeStyle={{ fontWeight: 'bold' }} />

const Nav = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Main</Link></li>
                <li><Link to="/history">History</Link></li>
            </ul>
        </nav>
    )
}

export default Nav
