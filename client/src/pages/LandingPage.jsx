// src/pages/LandingPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col justify-center items-center text-center p-6">
            <h1 className="text-5xl font-extrabold text-gray-800 mb-4">📘 Welcome to My Blog App</h1>
            <p className="text-lg text-gray-600 max-w-xl mb-8">
                Share your thoughts, connect with readers, and explore insightful posts in a beautiful and simple blog platform.
            </p>

            <div className="flex gap-6">
                <button
                    onClick={() => navigate("/login")}
                    className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
                >
                    Sign In
                </button>

                <button
                    onClick={() => navigate("/signup")}
                    className="px-6 py-2 rounded-lg bg-gray-100 text-gray-800 border border-gray-300 font-semibold hover:bg-white hover:shadow transition"
                >
                    Sign Up
                </button>
            </div>
        </div>
    );
}
