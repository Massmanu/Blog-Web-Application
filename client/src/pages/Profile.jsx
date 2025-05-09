import React, { useEffect, useState } from "react";
import PostCard from "../components/reusableComponents/PostCard";

export default function Profile() {
    const [userPosts, setUserPosts] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (user?._id || user?.id) {
            fetchUserPosts(user._id || user.id);
        }
    }, []);

    const fetchUserPosts = async (userId) => {
        try {
            const res = await fetch(`http://localhost:5000/api/posts?page=1&limit=50`);
            const data = await res.json();

            // 🧠 Filter posts by author ID
            const filtered = data.posts?.filter(
                (post) => post.author?._id === userId
            );
            setUserPosts(filtered || []);
        } catch (err) {
            console.error("Failed to load user posts", err);
        }
    };

    const handleDelete = async (postId) => {
        if (!window.confirm("Delete this post?")) return;
        try {
            const res = await fetch(`http://localhost:5000/api/posts/${postId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.ok) {
                setUserPosts((prev) => prev.filter((p) => p._id !== postId));
                alert("✅ Post deleted!");
            } else {
                const data = await res.json();
                alert(data.msg || "Failed to delete.");
            }
        } catch (err) {
            console.error("Delete error:", err);
            alert("Something went wrong.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
                <h1 className="text-3xl font-bold mb-2 text-gray-800">My Profile</h1>
                <p className="text-gray-600 mb-6">Welcome, {user?.name || "User"}!</p>

                <div className="bg-gray-100 p-4 rounded mb-8">
                    <p><strong>Name:</strong> {user?.name}</p>
                    <p><strong>Email:</strong> {user?.email}</p>
                    <p><strong>User ID:</strong> {user?._id || user?.id}</p>
                </div>

                <h2 className="text-2xl font-semibold mb-4">My Posts</h2>
                {userPosts.length === 0 ? (
                    <p className="text-gray-600">You haven't written any posts yet.</p>
                ) : (
                    userPosts.map((post) => (
                        <PostCard
                            key={post._id}
                            post={post}
                            user={user}
                            onDelete={handleDelete}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
