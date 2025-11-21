import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const email = localStorage.getItem('username'); // email saved during login

    useEffect(() => {
        if (!email) return;

        // Fetch user data from backend
        axios.get(`http://localhost:3001/api/user/${email}`)
            .then(res => setUser(res.data))
            .catch(err => console.error('Error fetching user data:', err));
    }, [email]);

    if (!user) {
        return <p className="text-center mt-5">Loading user data...</p>;
    }

    return (
        <div className="container mt-5">
            <h4 className="text-center">Manage your account & appointments</h4>
            <div className="row mt-3">
                <div className="col-md-4 text-center">
                    <img src={user.profilePic || null} alt="userPic" className='card p-2' width={200} />
                </div>
                <div className="col-md-6 mt-3">
                    <div className="user-container mb-3">
                        <h6>Name: {user.name}</h6>
                        <h6>Gender: {user.gender}</h6>
                        <h6>Date of birth: {user.dob}</h6>
                        <h6>Phone: {user.phone}</h6>
                        <h6>Address: {user.address}</h6>
                        <h6>Email: {user.email}</h6>
                    </div>
                </div>
            </div>

            <div className="button-container text-center mt-5">
                <button className='btn btn-success'>
                    <i className='fa-solid fa-list'></i> Appointments
                </button>
            </div>
        </div>
    );
};

export default UserProfile;
