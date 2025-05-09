import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");

    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    // Load post + comments
    useEffect(() => {
        fetch(`http://localhost:5000/api/posts/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setPost(data);
                setComments(data.comments || []);
            })
            .catch((err) => console.error("Failed to load post", err));
    }, [id]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        if (!token || !user) {
            alert("You must be logged in to comment.");
            return;
        }

        const newComment = {
            text: commentText,
            post: id,
            author: user.id,
        };

        try {
            const res = await fetch("http://localhost:5000/api/comments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newComment),
            });

            const data = await res.json();
            if (res.ok) {
                setComments([...comments, data]);
                setCommentText("");
            } else {
                alert(data.msg || "Failed to add comment");
            }
        } catch (err) {
            console.error("Comment error:", err);
        }
    };

    if (!post) return <div className="p-6">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-6 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <p className="text-sm text-gray-400 mb-4">By: {post.author?.name || "Unknown"}</p>
            <p className="text-lg text-gray-700 whitespace-pre-wrap mb-8">{post.content}</p>

            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Leave a Comment</h2>
                <form onSubmit={handleCommentSubmit} className="flex flex-col gap-4">
                    <textarea
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Write your comment..."
                        rows={3}
                        required
                        className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="self-end bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                    >
                        Post Comment
                    </button>
                </form>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-4">Comments</h2>
                {comments.length === 0 ? (
                    <p className="text-gray-500">No comments yet.</p>
                ) : (
                    comments.map((comment) => (
                        <div key={comment._id} className="bg-white p-4 mb-3 rounded shadow">
                            <p className="text-gray-800">{comment.text}</p>
                            <p className="text-sm text-gray-500 mt-1">By: {comment.author?.name || "Anonymous"}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
