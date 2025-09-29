import React, { useState } from 'react';
import '../Auth/auth.css';
import { NavLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const TeacherRegister = () => {
    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    // const [pic, setPic] = useState(null); // file object
    const [degree, setDegree] = useState('');
    const [about, setAbout] = useState('');
    const [experience, setExperience] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [password, setPassword] = useState('');
    const [available, setAvailable] = useState(true);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3001/teachers", {
                name,
                subject,
                degree,
                about,
                experience,
                email,
                contact,
                password,
                available
            });

            console.log("teacher register==>", res.data);
            toast.success("Teacher registered successfully");

            // reset fields
            setName("");
            setSubject("");
            setDegree("");
            setAbout("");
            setExperience("");
            setEmail("");
            setContact("");
            setPassword("");
            setAvailable(true);

            navigate("/teacher");
        } catch (error) {
            console.error(error);
            toast.error("Registration failed");
        }
    };

    return (
        <div className="auth-container">
            <div className="card">
                <h2>Register Teacher</h2>
                <p>Please enter teacher details</p>

                <div className="form-group mb-3">
                    <input type="text" placeholder="Enter Name"
                        value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="form-group mb-3">
                    <input type="text" placeholder="Enter Subject"
                        value={subject} onChange={(e) => setSubject(e.target.value)} />
                </div>

                {/* <div className="form-group mb-3">
                    <input type="file" accept="image/*"
                        onChange={(e) => setPic(e.target.files[0])} />
                </div> */}

                <div className="form-group mb-3">
                    <input type="text" placeholder="Enter Degree"
                        value={degree} onChange={(e) => setDegree(e.target.value)} />
                </div>

                <div className="form-group mb-3">
                    <textarea placeholder="About Teacher"
                        value={about} onChange={(e) => setAbout(e.target.value)} />
                </div>

                <div className="form-group mb-3">
                    <input type="text" placeholder="Years of Experience"
                        value={experience} onChange={(e) => setExperience(e.target.value)} />
                </div>
                <div className="form-group mb-3">
                    <input type="text" placeholder="Enter emailID"
                        value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="form-group mb-3">
                    <input type="number" placeholder="Enter Contact number"
                        value={contact} onChange={(e) => setContact(e.target.value)} />
                </div>

                <div className="form-group mb-3">
                    <input type="password" placeholder="Enter password"
                        value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>


                <div className="form-group mb-3">
                    <label>
                        <input
                            type="checkbox"
                            checked={available}
                            onChange={() => setAvailable(!available)}
                        />
                        Available for appointment
                    </label>
                </div>

                <button className="btn btn-primary"
                    disabled={!name || !subject || !degree || !about || !experience || !email || !contact || !password}
                    onClick={handleSubmit}>
                    REGISTER TEACHER
                </button>

                <p className="mt-3">Want to view all teachers? <NavLink to="/teacher">Click here</NavLink></p>
            </div>
        </div>
    );
};

export default TeacherRegister;
