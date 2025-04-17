import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./auth/AuthSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, token } = useSelector((state) => state.auth);
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(user)); 
        navigate('/');

    };

    useEffect(() => {
        if (token) {
            localStorage.setItem("auth_token", token);
            navigate('/create_post');
        }
    }, [token, navigate]);

    return (
        <Layout>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <div className="space-y-6">
                    <div className="border-b border-gray-200 pb-6">
                        <h2 className="text-lg font-semibold text-gray-900">Login</h2>
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                        <div className="mt-4 grid grid-cols-1 gap-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="janesmith@gmail.com"
                                        value={user.email}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={user.password}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-x-4">
                        <button
                            type="button"
                            className="rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </Layout>
    );
}
