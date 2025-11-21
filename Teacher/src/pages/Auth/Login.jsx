import React, { useState } from 'react';
import './Auth.css';
import { NavLink, useNavigate } from 'react-router-dom'; // make sure it's react-router-dom
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3001/login', { email, password })
            .then(result => {
                console.log(result.data); // log only the data
                if (result.data === "success") {
                    localStorage.setItem('username', email);
                    console.log(email);
                    navigate('/home'); // absolute path
                    window.location.reload();

                } else {
                    alert(result.data); // show the backend message
                }
            })
            .catch(err => {
                console.error(err);
                alert('Something went wrong. Please try again.');
            });
    };


    return (
        <div className="auth-container">
            <div className="card">
                <h2>Login</h2>
                <p>Please enter your login details</p>
                <div className="form-group mb-3">
                    <input
                        type='text'
                        placeholder='Enter Email-Id'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group mb-3">
                    <input
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                    className='btn btn-primary'
                    disabled={!email || !password}
                    onClick={handleSubmit}
                >
                    LOGIN
                </button>
                <p className='mt-3'>
                    New User? <NavLink to="/Register">Register!</NavLink> here.
                </p>
            </div>
        </div>
    );
};

export default Login;
