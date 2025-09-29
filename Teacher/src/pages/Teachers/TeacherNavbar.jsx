// src/pages/Teachers/TeacherNavbar.jsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function TeacherNavbar() {
    const { logoutTeacher } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("teacher"); // clear teacher login
        window.location.replace("/home"); // redirect and refresh
    };


    const teacherEmail = localStorage.getItem("teacher"); // returns string


    return (
        <div className="admin-navbar-container"> {/* reuse same classname */}
            <div className="admin-topbar-container">
                <h1 className="admin-brand">Teacher Panel</h1>
                <div className="admin-nav-links">
                    {teacherEmail && (
                        <>
                            <button onClick={handleLogout} className="admin-logout-btn">
                                Logout
                            </button>
                        </>
                    )}

                </div>
            </div>
        </div>
    );
}
