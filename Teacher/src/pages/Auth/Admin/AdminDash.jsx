import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Admin/AdminDash.css"
const AdminDashboard = () => {
    const [stats, setStats] = useState({
        teachers: 0,
        students: 0,
        appointments: 0,
        pending: 0,
    });
    const [recentAppointments, setRecentAppointments] = useState([]);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            // 👉 Replace with your backend routes
            const [teachersRes, studentsRes, appointmentsRes] = await Promise.all([
                axios.get("http://localhost:3001/admin/teachers"),
                axios.get("http://localhost:3001/admin/students"),
                axios.get("http://localhost:3001/admin/appointments"),
            ]);


            const appointments = appointmentsRes.data || [];

            setStats({
                teachers: teachersRes.data.length,
                students: studentsRes.data.length,
                appointments: appointments.length,
                pending: appointments.filter((a) => a.status === "Pending..").length,
            });

            // show last 5
            setRecentAppointments(appointments.slice(-5).reverse());
        } catch (err) {
            console.error("Error loading dashboard:", err);
        }
    };

    return (
        <div className="p-6">
            {/* Header */}
            <h1 className="text-3xl font-bold text-indigo-700 mb-6">
                Welcome, Admin 👋
            </h1>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <div className="bg-indigo-100 p-6 rounded-2xl shadow-md text-center">
                    <h2 className="text-2xl font-bold">{stats.teachers}</h2>
                    <p className="text-gray-600">Teachers</p>
                </div>
                <div className="bg-green-100 p-6 rounded-2xl shadow-md text-center">
                    <h2 className="text-2xl font-bold">{stats.students}</h2>
                    <p className="text-gray-600">Students</p>
                </div>
                <div className="bg-blue-100 p-6 rounded-2xl shadow-md text-center">
                    <h2 className="text-2xl font-bold">{stats.appointments}</h2>
                    <p className="text-gray-600">Appointments</p>
                </div>
                <div className="bg-yellow-100 p-6 rounded-2xl shadow-md text-center">
                    <h2 className="text-2xl font-bold">{stats.pending}</h2>
                    <p className="text-gray-600">Pending</p>
                </div>
            </div>

            {/* Recent Appointments */}
            <h2 className="text-2xl font-bold mb-4 text-indigo-600">
                Recent Appointments
            </h2>
            <div className="overflow-x-auto">
                <table className="min-w-full border rounded-lg shadow-md bg-white">
                    <thead>
                        <tr className="bg-indigo-500 text-white">
                            <th className="p-3 text-left">Student</th>
                            <th className="p-3 text-left">Teacher</th>
                            <th className="p-3 text-left">Date</th>
                            <th className="p-3 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentAppointments.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center p-4 text-gray-500">
                                    No recent appointments
                                </td>
                            </tr>
                        ) : (
                            recentAppointments.map((a) => (
                                <tr key={a._id} className="border-b hover:bg-indigo-50">
                                    <td className="p-3">{a.studentEmail}</td>
                                    <td className="p-3">{a.teacherName}</td>
                                    <td className="p-3">
                                        {new Date(a.dateTime).toLocaleDateString()}{" "}
                                        {new Date(a.dateTime).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </td>
                                    <td
                                        className={`p-3 font-semibold ${a.status === "Pending"
                                            ? "text-yellow-600"
                                            : a.status === "Approved"
                                                ? "text-green-600"
                                                : "text-red-600"
                                            }`}
                                    >
                                        {a.status}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
