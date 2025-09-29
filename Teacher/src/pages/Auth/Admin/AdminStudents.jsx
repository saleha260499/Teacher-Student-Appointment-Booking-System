import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Pages.css";

const AdminStudents = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const res = await axios.get("http://localhost:3001/students"); // backend API
            setStudents(res.data);
        } catch (err) {
            console.error("Error fetching students:", err);
            alert("Failed to fetch students");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading students...</p>;

    return (
        <div className="admin-teachers-container">
            <h2 className="admin-teachers-title">All Students (Admin)</h2>

            {students.length === 0 ? (
                <p>No students found.</p>
            ) : (
                <table className="admin-teachers-table">
                    <thead>
                        <tr>
                            <th>Student ID</th>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((s) => (
                            <tr key={s._id}>
                                <td>{s._id}</td>
                                <td>{s.name}</td>
                                <td>{s.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminStudents;
