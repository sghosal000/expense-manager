import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthService from "../apiservice/useAuthService";

const Login = () => {
    const { login } = useAuthService()

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await login(username, password);
            if (response.status) {
                navigate("/")
            }
        } catch (error) {
            // console.error(error)
            // console.log(error.response.data.message);
            if (!error.response) {
                setMessage('No Server response')
            } else if (error.response.status === 400) {
                setMessage('Missing required fields')
            } else if (error.response.status === 401) {
                setMessage('Invalid Login credentials')
            } else {
                setMessage("Login failed. Try again...");
            }
        } finally {
            setUsername("")
            setPassword("")

            setTimeout(() => setMessage(''), 5000)
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === "Tab") {
            document.getElementById("password").focus();
            e.preventDefault(); // Prevent default tab behavior
        }
    }

    return (
        <div className="background content-center lg:px-8 text-txt">
            <div className="w-5/6 mx-auto lg:max-w-lg">
                <form
                    className="space-y-6 p-4 md:p-10 rounded-lg shadow-2xl highlight-white bg-base"
                    onSubmit={handleSubmit}
                >
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        {/* <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                        /> */}
                        <h2 className="my-4 text-center text-xl font-bold leading-9 tracking-tight">
                            Sign in to your account
                        </h2>
                    </div>
                    <div className="h-1">
                        <p className="text-center text-xs text-light-red">{message}</p>
                    </div>
                    <div>
                        <label htmlFor="username" className="form-label">User ID</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            placeholder="Username or email"
                            onChange={(e) => setUsername(e.target.value)}
                            className="form-field"
                            autoFocus
                            onKeyDown={handleKeyPress}
                            required
                        />
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="form-label">Password</label>
                            <div className="text-sm">
                                <a
                                    href="#"
                                    className="font-semibold text-accent hover:text-sky-600"
                                >
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-field"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="form-submit"
                    >
                        Sign in
                    </button>
                    <p className="mt-10 text-center text-sm text-txt-depressed">
                        Don't have an account?{' '}
                        <a href="/signup" className="font-semibold leading-6 text-accent hover:text-sky-600">Sign up</a>
                    </p>
                </form>
            </div >
        </div >
    );
};

export default Login;

// return (
//     <div className="flex h-screen mt-10 px-10 bg-background text-txt">
//         <div className="w-2/3 flex flex-col items-center justify-center px-16">
//             <form className="flex justify-center items-center h-screen w-full" onSubmit={handleSubmit}>
//                 <div className="bg-base highlight-white shadow-xl rounded-lg px-8 py-6 w-full max-w-md">
//                     <h1 className="text-xl font-bold mb-4 text-center">Login</h1>
//                     <p>{message}</p>
//                     <div className="space-y-4">
//                         <div className="flex flex-col">
//                             <label htmlFor="username" className="text-sm font-medium text-txt-depressed mb-2">
//                                 Username
//                             </label>
//                             <input
//                                 type="text"
//                                 id="username"
//                                 value={username}
//                                 placeholder="Username or email"
//                                 onChange={(e) => setUsername(e.target.value)}
//                                 className="bg-slate-500 border border-neutral rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
//                                 required
//                             />
//                         </div>
//                         <div className="flex flex-col">
//                             <label htmlFor="password" className="text-sm font-medium text-txt-depressed mb-2">
//                                 Password
//                             </label>
//                             <input
//                                 type="password"
//                                 id="password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 className="bg-slate-500 border border-neutral rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
//                                 required
//                             />
//                         </div>
//                         <button
//                             type="submit"
//                             className="bg-accent hover:bg-blue-600 font-medium rounded-md py-2 px-4 focus:outline-none"
//                         >
//                             Login
//                         </button>
//                     </div>
//                 </div>
//             </form>
//         </div>
//         <div className="w-1/3 flex items-center justify-center">
//             <img src="https://img.freepik.com/free-vector/verification-technologies-abstract-concept-illustration_335657-3894.jpg?w=740&t=st=1714193749~exp=1714194349~hmac=addfd8d61197f7668fcb3fb9faf11eecdb0639ab0faa379308710d1d1b139b9e" alt="auth" className="w-90 h-84" />
//         </div>
//     </div>
// )
