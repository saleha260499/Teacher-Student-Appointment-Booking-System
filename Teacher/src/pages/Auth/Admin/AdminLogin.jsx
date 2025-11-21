import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext"; // adjust path
import "./AdminLogin.css";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { loginAdmin } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email === "admin@example.com" && password === "admin123") {
            loginAdmin();  // ✅ mark admin as logged in
            navigate("/admin"); // redirect to dashboard
        } else {
            setError("Invalid email or password ❌");
        }
    };

    return (
        <div className="admin-login-container">
            <div className="admin-card">
                <h2>Admin Login</h2>
                {error && <p className="error-text">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="admin@example.com"
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
