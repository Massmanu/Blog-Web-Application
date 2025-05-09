import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NewPost() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (title.trim().length < 2) {
            alert("Title must be at least 5 characters");
            return;
        }

        if (content.trim().length < 20) {
            alert("Content must be at least 20 characters");
            return;
        }

        if (!user || !token) {
            alert("You must be logged in to create a post.");
            return;
        }

        const postData = {
            title,
            content,
            author: user.id,
        };

        try {
            const response = await fetch("http://localhost:5000/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(postData),
            });

            const data = await response.json();

            if (response.ok) {
                alert("✅ Post created successfully!");
                navigate("/home");
            } else {
                alert(`❌ Error: ${data.msg || "Failed to create post"}`);
            }
        } catch (err) {
            console.error("Error submitting post:", err);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
            <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Create a New Post</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                            type="text"
                            name="title"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter your post title"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                        <textarea
                            name="content"
                            required
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows="6"
                            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Write your post content here..."
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white font-medium py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        Submit Post
                    </button>
                </form>
            </div>
        </div>
    );
}