import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../apiservice/AuthService";

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { status } = await authService.login(username, password)
            if (status) {
                setMessage("Login successful")
                navigate("/Dashboard")
            } else {
                setMessage("Invalid username or password");
            }
        } catch (error) {
            console.error(error);
            setMessage("Login failed");
        }
    }

    return (
        <div className="flex h-screen bg-background text-txt">
            <div className="w-1/2 flex flex-col items-center justify-center px-16 ">
                <form className="flex justify-center items-center h-screen w-full" onSubmit={handleSubmit}>
                    <div className="bg-base border-neutral shadow-xl rounded-lg px-8 py-6 w-full max-w-md">
                        <h1 className="text-xl font-bold mb-4 text-center">Login</h1>
                        <p>{message}</p>
                        <div className="space-y-4">
                            <div className="flex flex-col">
                                <label htmlFor="username" className="text-sm font-medium text-txt-depressed mb-2">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    value={username}
                                    placeholder="Username or email"
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="bg-slate-500 border border-neutral rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="password" className="text-sm font-medium text-txt-depressed mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-slate-500 border border-neutral rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-accent hover:bg-blue-600 font-medium rounded-md py-2 px-4 focus:outline-none"
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="w-1/2 flex items-center justify-center">
                <img src="https://img.freepik.com/free-vector/verification-technologies-abstract-concept-illustration_335657-3894.jpg?w=740&t=st=1714193749~exp=1714194349~hmac=addfd8d61197f7668fcb3fb9faf11eecdb0639ab0faa379308710d1d1b139b9e" alt="auth" className="w-90 h-84" />
            </div>
        </div>
    )
}

export default Login
