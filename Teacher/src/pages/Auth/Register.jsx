import React, { useState } from 'react';
import './Auth.css';
import { NavLink, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import axios from 'axios'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3001/register', { name, email, password });
            console.log("register==>", res.data);
            toast.success("Registered success");
            setName("");
            setEmail("");
            setPassword("");
            navigate("/login");
        } catch (error) {
            console.log(error);
            toast.error(error)
        }
    }

    return (
        <>
            <div className="auth-container">
                <div className="card">
                    <h2>Create Account</h2>
                    <p>
                        Please enter your details to Register
                    </p>
                    <div className="form-group mb-3">
                        <input type='text' placeholder='Enter your name'
                            value={name}
                            onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-group mb-3">
                        <input type='text' placeholder='Enter Email-Id'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group mb-3">
                        <input type='text' placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button className='btn btn-primary'
                        disabled={!name || !email || !password} onClick={handleSubmit}
                    >REGISTER</button>
                    <p className='mt-3'> Already a user? <NavLink to="/Login">Login here!</NavLink></p>
                </div>
            </div>
        </>
    )
}

export default Register