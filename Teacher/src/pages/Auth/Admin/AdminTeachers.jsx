import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Pages.css";

const AdminTeachers = () => {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTeachers();
    }, []);

    const fetchTeachers = async () => {
        try {
            const res = await axios.get("http://localhost:3001/admin/teachers");
            setTeachers(res.data);
        } catch (err) {
            console.error("Error fetching teachers:", err);
            alert("Failed to fetch teachers");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading teachers...</p>;

    return (
        <div className="admin-teachers-container">
            <h2 className="admin-teachers-title">All Teachers (Admin)</h2>

            {teachers.length === 0 ? (
                <p>No teachers found.</p>
            ) : (
                <table className="admin-teachers-table">
                    <thead>
                        <tr>
                            <th>Teacher ID</th>
                            <th>Name</th>
                            <th>Subject</th>
                            <th>Degree</th>
                            <th>Experience</th>
                            <th>Available</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teachers.map((t) => (
                            <tr key={t._id}>
                                <td>{t.teaId}</td>
                                <td>{t.name}</td>
                                <td>{t.subject}</td>
                                <td>{t.degree}</td>
                                <td>{t.experience} yrs</td>
                                <td className={t.available ? "admin-status-yes" : "admin-status-no"}>
                                    {t.available ? "Yes" : "No"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminTeachers;
