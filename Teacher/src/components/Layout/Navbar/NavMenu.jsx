import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import "../Navbar/NavMenu.css";

const NavMenu = () => {
    const [user, setUser] = useState(null);
    const [isOpen, setIsOpen] = useState(false); // NEW: for mobile toggle
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = localStorage.getItem('username');
        if (loggedInUser) setUser(loggedInUser);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('username');
        setUser(null);
        window.location.reload();
    };

    const handleBook = (e) => {
        e.preventDefault();
        navigate("/teacher");
    };

    const handleLoginSelect = (e) => {
        const role = e.target.value;
        if (!role) return;

        switch (role) {
            case "admin":
                navigate("/admin-login");
                break;
            case "teacher":
                navigate("/tPanel-login");
                break;
            case "student":
                navigate("/login");
                break;
            default:
                break;
        }
    };

    return (
        <nav className="navbar navbar-expand-lg">
            <div className='container-fluid'>
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={() => setIsOpen(!isOpen)} // toggle menu
                >
                    <span className="navbar-toggler-icon" />
                </button>

                <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarTogglerDemo02">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/'>Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/teacher'>Teacher</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/About">About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/Contact">Contact</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/view-appointments">Appointments</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="./user/profile">{user}</NavLink>
                        </li>
                    </ul>

                    {user ? (
                        <span className="nav-link">
                            <form className="d-flex">
                                <button type="button" onClick={handleLogout} className="btn btn-danger me-2">
                                    <i className='fa-solid fa-power-off'></i> Logout
                                </button>
                            </form>
                        </span>
                    ) : (
                        <select className="form-select me-2" onChange={handleLoginSelect} defaultValue="">
                            <option value="" disabled>Login as...</option>
                            <option value="admin">Admin</option>
                            <option value="teacher">Teacher</option>
                            <option value="student">Student</option>
                        </select>
                    )}

                    <form className="d-flex" role='search'>
                        <button className="btn btn-success" type="submit" onClick={handleBook}>Book Appointment</button>
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default NavMenu;
