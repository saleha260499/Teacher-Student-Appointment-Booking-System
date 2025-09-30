import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import { setHours, setMinutes, addDays } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import "./Appointment.css";

const Appointment = () => {
    const { id } = useParams();
    const [teacher, setTeacher] = useState(null);
    const [selectedDateTime, setSelectedDateTime] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!id) return;

        axios.get(`http://localhost:3001/teacher/${id}`)
            .then(res => setTeacher(res.data))
            .catch(err => console.error("Error fetching teacher data:", err));
    }, [id]);

    const filterTime = (time) => {
        const hour = time.getHours();
        const minutes = time.getMinutes();
        return minutes === 0 && hour >= 9 && hour <= 17;
    };

    const handleBooking = async () => {
        if (!selectedDateTime) {
            alert("⚠️ Please select a date and time for your appointment.");
            return;
        }

        const studentEmail = localStorage.getItem("username");
        if (!studentEmail) {
            alert("⚠️ Please log in before booking.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3001/appointments", {
                teacherId: id,
                studentEmail,
                dateTime: selectedDateTime.toISOString(),
                message
            });

            alert("✅ " + response.data.message);
        } catch (err) {
            console.error("Error booking appointment:", err);
            alert("❌ " + (err.response?.data?.message || "Failed to book appointment"));
        }
    };

    if (!teacher) return <p className="text-center mt-5">Loading teacher data...</p>;

    return (
        <div className="container-fluid p-4">
            <div className="card shadow-lg border-0 rounded-4 p-4 w-100">
                <div className="row g-4 align-items-center">

                    {/* Teacher Info */}
                    <div className="col-md-3 text-center">
                        <img
                            src={teacher.image || 'https://static.thenounproject.com/png/1743560-200.png'}
                            alt="Teacher"
                            className="rounded-circle border border-3 border-primary shadow-sm"
                            height={160} width={160}
                        />
                        <h4 className="mt-3 fw-bold">{teacher.name}</h4>
                        <span className={`badge px-3 py-2 mt-2 fs-6 ${teacher.available ? 'bg-success' : 'bg-danger'}`}>
                            {teacher.available ? 'Available' : 'Not Available'}
                        </span>
                    </div>

                    {/* Teacher Details & Booking */}
                    <div className="col-md-9">
                        <div className="teacher-details mb-4">
                            <h5 className="fw-semibold mb-2">Experience</h5>
                            <p>{teacher.experience} Years</p>

                            <h5 className="fw-semibold mb-2">About</h5>
                            <p className="text-muted">{teacher.about}</p>
                        </div>

                        <div className="booking-section mt-4 p-3 border rounded-3 shadow-sm">
                            <h5 className="fw-semibold mb-3">📅 Book Your Slot</h5>

                            <DatePicker
                                className="form-control shadow-sm"
                                selected={selectedDateTime}
                                onChange={setSelectedDateTime}
                                showTimeSelect
                                timeFormat="h:mm aa"
                                timeIntervals={60}  // Full hour only
                                dateFormat="d MMMM yyyy, h:mm aa"
                                minDate={addDays(new Date(), 1)}  // Next day onward
                                filterTime={filterTime}           // Full hours 9-22
                                placeholderText="Select date & time"
                            /><p className="mt-3 text-secondary fst-italic">
                                ⚠️ Note: All appointments are 1 hour in duration.
                            </p>


                            {selectedDateTime && (

                                <p className="mt-3 text-secondary fst-italic">
                                    Selected slot: <span className="fw-bold text-dark">{selectedDateTime.toLocaleString()}</span>
                                </p>
                            )}

                            <textarea
                                className="form-control mt-3"
                                rows="3"
                                placeholder="Write your reason for appointment..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />

                            <div className="d-flex justify-content-start mt-4">

                                <button
                                    className={`btn btn-lg px-4 shadow-sm rounded-3 ${teacher.available ? 'btn-primary' : 'btn-secondary'}`}
                                    disabled={!teacher.available}
                                    onClick={handleBooking}
                                >
                                    {teacher.available ? "📖 Book Now" : "❌ Not Available"}
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Appointment;
