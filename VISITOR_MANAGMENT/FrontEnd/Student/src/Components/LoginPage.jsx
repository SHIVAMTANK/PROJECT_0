import React, { useState } from "react";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = (event) => {
        event.preventDefault();
        console.log("Email:", email);
        console.log("Password:", password);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="flex w-11/12 max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="flex-1 bg-blue-100 flex justify-center items-center">
                    <img src="login.png" alt="Login Illustration" className="w-4/5 max-w-sm" />
                </div>
                <div className="flex-1 p-10">
                    <h2 className="text-2xl font-semibold mb-5">
                        Welcome to <span className="text-purple-600 font-bold">Visitor System</span>
                    </h2>
                    <div className="flex items-center mb-5">
                        <hr className="flex-grow border-gray-300" />
                        <hr className="flex-grow border-gray-300 ml-2" />
                    </div>
                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm text-gray-700 mb-2">
                                Email
                            </label>
                            <div className="flex items-center bg-gray-100 border border-gray-300 rounded-lg p-2">
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="flex-1 bg-transparent outline-none text-gray-700"
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="flex items-center bg-gray-100 border border-gray-300 rounded-lg p-2">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="flex-1 bg-transparent outline-none text-gray-700"
                                />
                                <span
                                    className="cursor-pointer text-gray-600 ml-2"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? "🙈" : "👁️"}
                                </span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center mb-6 text-sm text-gray-600">
                            <label>
                                <input type="checkbox" className="mr-1" /> Remember me
                            </label>
                            <a href="#" className="text-purple-600 hover:underline">
                                Forgot Password?
                            </a>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                        >
                            Login
                        </button>
                    </form>
                    <p className="mt-6 text-center text-sm">
                        Don’t have an account?{" "}
                        <a href="#" className="text-purple-600 hover:underline">
                            Register
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
