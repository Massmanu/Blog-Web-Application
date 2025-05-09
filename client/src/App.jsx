import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Layout from './components/Layout';
import Home from './pages/Home';
import NewPost from './pages/NewPost';
import { LoginForm } from './pages/LoginForm.jsx';
import SignupForm from './pages/SignupForm.jsx';
import AllPosts from "./pages/AllPosts.jsx";
import PostDetail from "./pages/PostDetail.jsx";
import Profile from './pages/Profile';
import LandingPage from './pages/LandingPage';
import PrivateRoute from "./components/PrivateRoute";
import { isLoggedIn } from "./utils/auth";


export default function App() {
    return (
        <Routes>
            {/* Public routes - no Layout */}
            <Route path="/" element={<LandingPage />} />

            <Route path="/signup" element={isLoggedIn() ? <Navigate to="/home" /> : <SignupForm />} />
            <Route path="/login" element={isLoggedIn() ? <Navigate to="/home" /> : <LoginForm />} />

            {/* Protected routes inside Layout */}
            <Route
                element={
                    <PrivateRoute>
                        <Layout />
                    </PrivateRoute>
                }
            >
                <Route path="/home" element={<Home />} />
                <Route path="/new" element={<NewPost />} />
                <Route path="/blogs" element={<AllPosts />} />
                <Route path="/posts/:id" element={<PostDetail />} />
                <Route path="/profile" element={<Profile />} />
            </Route>
        </Routes>
    );
}
