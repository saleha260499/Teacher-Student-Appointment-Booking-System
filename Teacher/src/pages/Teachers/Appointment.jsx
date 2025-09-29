import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setHours, setMinutes } from "date-fns";
import axios from 'axios';
import "./Appointment.css";

const Appointment = () => {
    const [message, setMessage] = useState("");
    const { id } = useParams();
    const [teacher, setTeacher] = useState(null);
    const [selectedDateTime, setSelectedDateTime] = useState(new Date());

    useEffect(() => {
        if (!id) return;

        axios.get(`http://localhost:3001/teacher/${id}`)
            .then(res => setTeacher(res.data))
            .catch(err => console.error('Error fetching teacher data:', err));
    }, [id]);

    const handleBooking = async () => {
        try {
            const studentEmail = localStorage.getItem("username");
            if (!studentEmail) {
                alert("⚠️ Please log in before booking.");
                return;
            }

            const response = await axios.post("http://localhost:3001/appointments", {
                teacherId: id,
                studentEmail,
                dateTime: selectedDateTime.toISOString(),
                message
            });

            alert("✅ " + response.data.message);

        } catch (err) {
            console.error("Error booking appointment:", err);

            if (err.response && err.response.data?.message) {
                alert("❌ " + err.response.data.message);
            } else {
                alert("❌ Failed to book appointment");
            }
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
                                minDate={new Date()}
                                selected={selectedDateTime}
                                onChange={setSelectedDateTime}
                                showTimeSelect
                                timeFormat="h:mm aa"
                                timeIntervals={30}
                                dateFormat="d MMMM yyyy, h:mm aa"
                                minTime={setHours(setMinutes(new Date(), 0), 9)}
                                maxTime={setHours(setMinutes(new Date(), 0), 22)}
                            />

                            <p className="mt-3 text-secondary fst-italic">
                                Selected slot: <span className="fw-bold text-dark">
                                    {selectedDateTime.toLocaleString()}
                                </span>
                            </p>
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
