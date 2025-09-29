import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminNavbar.css";

import { useAuth } from "../../../context/AuthContext";

export default function AdminNavbar() {
    const { logoutAdmin } = useAuth();
    const navigate = useNavigate(); // ✅ define navigate

    const handleLogout = () => {
        logoutAdmin();                     // clear admin state
        navigate("/admin-login");          // redirect to login
    };

    return (
        <div className="admin-navbar-container">
            <div className="admin-topbar-container">
                <h1 className="admin-brand">Admin Panel</h1>
                <div className="admin-nav-links">
                    <Link className="admin-link" to="/admin">Dashboard</Link>

                    <Link className="admin-link" to="/admin/register">
                        Register New Teacher
                    </Link>
                    <Link className="admin-link" to="/admin/teachers">View Teachers</Link>
                    <Link className="admin-link" to="/admin/students">Students</Link>
                    <Link className="admin-link" to="/admin/appointments">Appointments</Link>
                    <button onClick={handleLogout} className="admin-logout-btn">Logout</button>
                </div>
            </div>
        </div>
    );
};
