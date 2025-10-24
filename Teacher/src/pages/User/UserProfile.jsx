import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const email = localStorage.getItem('username'); // email saved during login

    useEffect(() => {
        if (!email) return;

        axios.get("https://teacher-student-appointment-booking-hviw.onrender.com/api/user/${email}")
            .then(res => setUser(res.data))
            .catch(err => console.error('Error fetching user data:', err));
    }, [email]);

    if (!user) {
        return <p className="text-center mt-5" style={{ color: 'black' }}>Loading user data...</p>;
    }

    return (
        <div className="container mt-5">
            <div className="card p-4 shadow-sm mx-auto text-center" style={{ maxWidth: '400px', backgroundColor: '#fff', color: 'black' }}>
                <h6 style={{ color: 'black', marginBottom: '20px' }}>Email: {user.email}</h6>

                <button className="btn btn-warning px-4 py-2">
                    <i className="fa-solid fa-list me-2"></i> Appointments
                </button>
            </div>
        </div>
    );
};

export default UserProfile;
