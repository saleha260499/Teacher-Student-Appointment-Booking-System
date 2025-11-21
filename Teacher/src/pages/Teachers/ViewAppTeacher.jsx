import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Teachers/ViewAppTeacher.css";

const ViewAppointmentsTeacher = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionId, setActionId] = useState(null); // store id to approve/reject
    const [actionType, setActionType] = useState(""); // approve / reject
    const teacherEmail = localStorage.getItem("teacher");
    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const teacherEmail = localStorage.getItem("teacher"); // teacher login
            if (!teacherEmail) return setLoading(false);

            const res = await axios.get(
                `http://localhost:3001/viewteacherappointment?teacherEmail=${teacherEmail}`
            );
            setAppointments(res.data);
        } catch (err) {
            console.error("Error fetching appointments:", err);
            alert("Failed to fetch appointments");
        } finally {
            setLoading(false);
        }
    };

    const [available, setAvailable] = useState(false);

    useEffect(() => {
        // Fetch teacher data for availability when component mounts
        const teacherEmail = localStorage.getItem("teacher");
        if (!teacherEmail) return;
        axios.get(`http://localhost:3001/teacher/${teacherEmail}`)
            .then(res => setAvailable(res.data.available))
            .catch(err => console.error("Error fetching teacher availability:", err));
    }, []);

    const toggleAvailability = async () => {
        try {
            const teacherEmail = localStorage.getItem("teacher");
            const newStatus = !available;
            await axios.put(`http://localhost:3001/teacher/${teacherEmail}/availability`, {
                available: newStatus
            });
            setAvailable(newStatus);
        } catch (err) {
            console.error("Error updating availability:", err);
            alert("❌ Failed to update availability");
        }
    };


    const handleAction = async () => {
        if (!actionId || !actionType) return;

        try {
            await axios.put(`http://localhost:3001/viewteacherappointment/${actionId}`, {
                status: actionType,
            });
            alert(`Appointment ${actionType}d successfully!`);
            fetchAppointments();
        } catch (err) {
            console.error(`Error updating appointment:`, err);
            alert("Failed to update appointment");
        } finally {
            setActionId(null);
            setActionType("");
        }
    };

    if (loading) return <p className="text-center mt-10">Loading appointments...</p>;

    return (
        <div className="container">
            <div className="mb-4 flex justify-end">
                <button
                    onClick={toggleAvailability}
                    className={`availability-btn ${available ? "available" : "not-available"}`}
                >
                    {available ? "🟢 Open for Appointments" : "🔴 Closed for Appointments"}
                </button>
            </div>

            <h2 className="text-3xl font-bold mb-6 text-center text-green-600">
                My Student Appointments
            </h2>

            {appointments.length === 0 ? (
                <p className="text-center text-gray-500">No appointments found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="appointments-table">
                        <thead>
                            <tr>
                                <th className="p-3 text-left bg-green-500 text-white rounded-tl-lg">
                                    Student
                                </th>
                                <th className="p-3 text-left bg-green-500 text-white">Email</th>
                                <th className="p-3 text-left bg-green-500 text-white">Date</th>
                                <th className="p-3 text-left bg-green-500 text-white">Time</th>
                                <th>Reason</th>
                                <th className="p-3 text-left bg-green-500 text-white rounded-tr-lg">
                                    Action
                                </th>
                                <th className="p-3 text-left bg-green-500 text-white">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((app, index) => (
                                <tr
                                    key={app._id}
                                    className={`transition-transform transform hover:scale-105 
                    ${index % 2 === 0 ? "bg-green-50" : "bg-green-100"} 
                    rounded-lg shadow-md mb-2`}
                                >
                                    <td className="p-4 font-semibold">{app.studentName}</td>
                                    <td className="p-4">{app.studentEmail}</td>
                                    <td className="p-4">
                                        {new Date(app.dateTime).toLocaleDateString()}
                                    </td>
                                    <td className="p-4">
                                        {new Date(app.dateTime).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </td>
                                    <td>{app.message || "—"}</td>
                                    <td className="p-4 flex gap-2">
                                        <button
                                            className="btn btn-green"
                                            onClick={() => {
                                                setActionId(app._id);
                                                setActionType("approved");
                                            }}
                                        >
                                            Approve
                                        </button>
                                        <button
                                            className="btn btn-red"
                                            onClick={() => {
                                                setActionId(app._id);
                                                setActionType("rejected");
                                            }}
                                        >
                                            Reject
                                        </button>
                                    </td>
                                    <td className="p-4 font-semibold">{app.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Confirmation Modal */}
            {actionId && (
                <div className="modal-overlay">
                    <div className="modal-card">
                        <h3 className="modal-title">
                            Confirm {actionType === "approved" ? "Approval" : "Rejection"}
                        </h3>
                        <p className="modal-text">
                            Are you sure you want to {actionType} this appointment?
                        </p>
                        <div className="modal-actions">
                            <button className="btn-green" onClick={handleAction}>
                                Yes, {actionType}
                            </button>
                            <button
                                className="btn-gray"
                                onClick={() => {
                                    setActionId(null);
                                    setActionType("");
                                }}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewAppointmentsTeacher;
