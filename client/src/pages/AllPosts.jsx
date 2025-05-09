import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";
import PostCard from "../components/reusableComponents/PostCard";
import PaginationControls from "../components/reusableComponents/PaginationControls";
import SearchInput from "../components/reusableComponents/SearchInput";

export default function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    const fetchPosts = async (query = "", pageNumber = 1) => {
        try {
            const res = await fetch(
                `http://localhost:5000/api/posts?search=${encodeURIComponent(query)}&page=${pageNumber}&limit=5`
            );
            const data = await res.json();
            console.log(data)
            // Fix: Always fallback to [] if data.posts is missing
            setPosts(data.posts || []);
            setTotalPages(data.totalPages || 1);
            setPage(data.currentPage || 1);
        } catch (err) {
            console.error("Failed to load posts", err);
            setPosts([]); // fallback on error
        }
    };

    useEffect(() => {
        fetchPosts(searchTerm, page);
    }, [page]);

    // Debounced search
    const debouncedSearch = debounce((term) => {
        setPage(1); // reset to first page on new search
        fetchPosts(term, 1);
    }, 300);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        debouncedSearch(value);
    };

    const handleDelete = async (postId) => {
        if (!window.confirm("Delete this post?")) return;
        try {
            const res = await fetch(`http://localhost:5000/api/posts/${postId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.ok) {
                setPosts((prev) => prev.filter((p) => p._id !== postId));
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

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">All Posts</h1>

            {/* 🔍 Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
                <SearchInput value={searchTerm} onChange={handleSearchChange} />
            </div>

            <div className="grid gap-6 max-w-4xl mx-auto">
                {posts.length === 0 ? (
                    <p className="text-center text-gray-600">No posts found.</p>
                ) : (
                    posts.map((post) => (
                        <PostCard key={post._id} post={post} user={user} onDelete={handleDelete} />
                    ))
                )}
            </div>

            {/* Pagination Controls */}
            <PaginationControls page={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
    );
}
