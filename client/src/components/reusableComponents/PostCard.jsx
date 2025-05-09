import React from "react";
import { useNavigate } from "react-router-dom";

export default function PostCard({ post, user, onDelete }) {
    const navigate = useNavigate();

    return (
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <h2
                onClick={() => navigate(`/posts/${post._id}`)}
                className="text-xl font-semibold mb-2 text-indigo-600 hover:underline cursor-pointer"
            >
                {post.title}
            </h2>

            <p className="text-gray-600 mb-2 whitespace-pre-line">
                {post.content.length > 150
                    ? post.content.slice(0, 150) + "..."
                    : post.content}
            </p>

            <button
                onClick={() => navigate(`/posts/${post._id}`)}
                className="text-sm text-blue-500 hover:underline"
            >
                Read more
            </button>

            <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-gray-400">
                    By: {post.author?.name || "Unknown"}
                </p>

                {user?.id === post.author?._id && (
                    <button
                        onClick={() => onDelete(post._id)}
                        className="text-sm text-red-500 hover:underline"
                    >
                        Delete
                    </button>
                )}
            </div>
        </div>
    );
}
