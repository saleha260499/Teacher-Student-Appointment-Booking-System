import React from 'react'
import Topbar from './Topbar'
import NavMenu from './NavMenu'
import { NavLink } from 'react-router'
import Logo from '../../../assets/logo.jpg'
import './Navbar.css';


const Navbar = () => {
    return (
        <>
            <div className="navbar-container">
                <div className="row">
                    <div className="col-md-3">
                        <NavLink to="/">
                            <img src={Logo} alt="logo" className='brand-logo'></img>
                        </NavLink>
                    </div>
                    <div className="col-md-9">
                        {/* TopBar menu */}
                        <div>
                            <Topbar />
                        </div>
                        {/* NavMenu */}
                        <div>
                            <NavMenu />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar