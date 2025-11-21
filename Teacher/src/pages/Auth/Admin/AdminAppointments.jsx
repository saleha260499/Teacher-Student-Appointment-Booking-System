import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Pages.css";
const AdminAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const res = await axios.get("http://localhost:3001/admin/appointments"); // backend API
            setAppointments(res.data);
        } catch (err) {
            console.error("Error fetching appointments:", err);
            alert("Failed to fetch appointments");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading appointments...</p>;

    return (
        <div className="admin-teachers-container">
            <h2 className="admin-teachers-title">All Appointments (Admin)</h2>

            {appointments.length === 0 ? (
                <p>No appointments found.</p>
            ) : (
                <table className="admin-teachers-table">
                    <thead>
                        <tr>
                            <th>Appointment ID</th>
                            <th>Teacher ID</th>
                            <th>Teacher Name</th>
                            <th>Student ID</th>
                            <th>Student Name</th>
                            <th>Student Email</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((a) => (
                            <tr key={a._id}>
                                <td>{a._id}</td>
                                <td>{a.teacherId}</td>
                                <td>{a.teacherName}</td>
                                <td>{a.studentId}</td>
                                <td>{a.studentName}</td>
                                <td>{a.studentEmail}</td>
                                <td>{new Date(a.dateTime).toLocaleDateString()}</td>
                                <td>{new Date(a.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                                <td>{a.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminAppointments;
