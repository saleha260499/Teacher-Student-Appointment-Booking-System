// src/pages/Teachers/TeacherLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import "./TeacherLogin.css";

export default function TeacherLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { loginTeacher } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await axios.post("http://localhost:3001/teacher-login", { email, password });

            if (res.data?.message === "success") {
                // Save teacher info to localStorage
                localStorage.setItem("teacher", res.data.teacher.email); // store only email
                loginTeacher(); // mark teacher as logged in
                navigate("/tPanel-view-appointments"); // redirect to teacher dashboard
            } else {
                setError(res.data?.message || "Login failed ❌");
            }
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Server error ❌");
        }
    };

    return (
        <div className="teacher-login-container">
            <div className="teacher-card">
                <h2>Teacher Login</h2>
                {error && <p className="error-text">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="teacher@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}
