import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../apiservice/AuthService";

const Signup = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        fname: "",
        lname: "",
        age: ""
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { status } = await authService.signup(formData); // Destructure response for status
            if (status) {
                setMessage("Signup successful. You can now login.");
                navigate("/login");
            } else {
                setMessage("Signup failed. Please try again.");
            }
        } catch (error) {
            console.error(error);
            setMessage("Signup failed. Please try again.");
        }
    };

    return (
        <div className="flex h-screen ">
            <div className="w-1/2 flex flex-col items-center justify-center ">
                <form className="flex justify-center items-center h-screen w-full" onSubmit={handleSubmit}>
                    <div className="bg-white shadow-xl rounded-lg px-8 py-6 w-full max-w-md">
                        <h1 className="text-xl font-bold mb-4 text-center">Sign Up</h1>
                        <p>{message}</p>
                        <div className="space-y-4">
                            <div className="flex flex-col">
                                <label htmlFor="username" className="text-sm font-medium mb-2">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="email" className="text-sm font-medium mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="password" className="text-sm font-medium mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="fname" className="text-sm font-medium mb-2">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="fname"
                                    name="fname"
                                    value={formData.fname}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="lname" className="text-sm font-medium mb-2">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="lname"
                                    name="lname"
                                    value={formData.lname}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="age" className="text-sm font-medium mb-2">
                                    Age
                                </label>
                                <input
                                    type="number"
                                    id="age"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md py-2 px-4 focus:outline-none"
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="w-1/2 flex items-center justify-center ">
                <img src="https://img.freepik.com/free-vector/verification-technologies-abstract-concept-illustration_335657-3894.jpg?w=740&t=st=1714193749~exp=1714194349~hmac=addfd8d61197f7668fcb3fb9faf11eecdb0639ab0faa379308710d1d1b139b9e" 
                alt="auth" className="w-90 h-84" />
            </div>
        </div>
    );
};

export default Signup;