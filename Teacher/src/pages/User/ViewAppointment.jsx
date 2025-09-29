import React, { useEffect, useState } from "react";
import axios from "axios";
import "../User/ViewAppointment.css";


const ViewAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [confirmId, setConfirmId] = useState(null); // store id to cancel
    const [rescheduleId, setRescheduleId] = useState(null); // store id to reschedule
    const [newDateTime, setNewDateTime] = useState(""); // new datetime for reschedule

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const studentEmail = localStorage.getItem("username");
            if (!studentEmail) return setLoading(false);

            const res = await axios.get(
                `http://localhost:3001/appointments?studentEmail=${studentEmail}`
            );
            setAppointments(res.data);
        } catch (err) {
            console.error("Error fetching appointments:", err);
            alert("Failed to fetch appointments");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/appointments/${id}`);
            alert("Appointment cancelled!");
            fetchAppointments(); // refresh list
        } catch (err) {
            console.error("Error cancelling appointment:", err);
            alert("Failed to cancel appointment");
        } finally {
            setConfirmId(null); // close modal
        }
    };

    const handleReschedule = async () => {
        if (!newDateTime) return alert("Please select a date and time");

        try {
            await axios.put(`http://localhost:3001/appointments/${rescheduleId}`, {
                dateTime: newDateTime,
            });
            alert("Appointment rescheduled!");
            fetchAppointments(); // refresh list
        } catch (err) {
            console.error("Error rescheduling appointment:", err);
            alert("Failed to reschedule appointment");
        } finally {
            setRescheduleId(null);
            setNewDateTime("");
        }
    };

    if (loading) return <p className="text-center mt-10">Loading appointments...</p>;

    return (
        <div className="container">
            <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
                My Appointments
            </h2>

            {appointments.length === 0 ? (
                <p className="text-center text-gray-500">No appointments found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="appointments-table ">
                        <thead>
                            <tr>
                                <th className="p-3 text-left bg-indigo-500 text-white rounded-tl-lg">
                                    Teacher
                                </th>
                                <th className="p-3 text-left bg-indigo-500 text-white">Date</th>
                                <th className="p-3 text-left bg-indigo-500 text-white">Time</th>
                                <th className="p-3 text-left bg-indigo-500 text-white">Email</th>
                                <th className="p-3 text-left bg-indigo-500 text-white rounded-tr-lg">
                                    Action
                                </th>
                                <th className="p-3 text-left bg-indigo-500 text-white">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((app, index) => (
                                <tr
                                    key={app._id}
                                    className={`transition-transform transform hover:scale-105 
                    ${index % 2 === 0 ? "bg-indigo-50" : "bg-indigo-100"} 
                    rounded-lg shadow-md mb-2`}
                                >
                                    <td className="p-4 font-semibold">{app.teacherName}</td>
                                    <td className="p-4">{new Date(app.dateTime).toLocaleDateString()}</td>
                                    <td className="p-4">
                                        {new Date(app.dateTime).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </td>
                                    <td className="p-4">{app.studentEmail}</td>
                                    <td className="p-4 flex gap-2">
                                        <button
                                            className="btn btn-red"
                                            onClick={() => setConfirmId(app._id)}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className="btn btn-blue"
                                            onClick={() => {
                                                setRescheduleId(app._id);
                                                setNewDateTime(new Date(app.dateTime).toISOString().slice(0, 16));
                                            }}
                                        >
                                            Reschedule
                                        </button>
                                    </td>
                                    <td className="p-4 font-semibold">{app.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Cancel Confirmation Modal */}
            {confirmId && (
                <div className="modal-overlay">
                    <div className="modal-card">
                        <h3 className="modal-title">Confirm Cancellation</h3>
                        <p className="modal-text">Are you sure you want to cancel this appointment?</p>
                        <div className="modal-actions">
                            <button className="btn-red" onClick={() => handleCancel(confirmId)}>
                                Yes, Cancel
                            </button>
                            <button className="btn-gray" onClick={() => setConfirmId(null)}>
                                No
                            </button>
                        </div>
                    </div>
                </div>

            )}

            {/* Reschedule Modal */}
            {rescheduleId && (
                <div className="modal-overlay">
                    <div className="modal-card">
                        <h3 className="modal-title">Reschedule Appointment</h3>
                        <p className="modal-text">Pick a new date and time:</p>

                        <input
                            type="datetime-local"
                            className="input-datetime"
                            value={newDateTime}
                            onChange={(e) => setNewDateTime(e.target.value)}
                            min={new Date().toISOString().slice(0, 16)} /* prevent past dates */
                        />

                        <div className="modal-actions">
                            <button className="btn-blue" onClick={handleReschedule}>
                                Save
                            </button>
                            <button className="btn-gray" onClick={() => setRescheduleId(null)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewAppointments;
