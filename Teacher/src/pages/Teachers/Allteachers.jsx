import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import "../Teachers/Allteachers.css";

const Allteachers = () => {
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const res = await axios.get("http://localhost:3001/allteachers");
                setTeachers(res.data);
            } catch (err) {
                console.error("Failed to fetch teachers:", err);
            }
        };
        fetchTeachers();
    }, []);

    return (
        <>
            <h4 className='text-center text-success mt-3'>
                Select a teacher and book your appointment now!
            </h4>
            <div className="container tea-container">
                {teachers.map(d => (
                    <div className="card" key={d.teaId} style={{ width: "15rem" }}>
                        <NavLink to={`./${d._id}`} className="teacher-link">
                            <img
                                src="https://static.thenounproject.com/png/1743560-200.png"
                                alt='picture'
                                width={150}
                                height={150}
                                className='card-image-top'
                            />
                            <div className="card-body">
                                <h6 className="teacher-name">{d.name}</h6>
                                <p className="teacher-degree">{d.degree}</p>
                            </div>
                            <div className="card-footer">
                                <p className="teacher-subject">
                                    <i className={d.experience}></i> {d.subject}
                                </p>
                            </div>
                        </NavLink>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Allteachers;
