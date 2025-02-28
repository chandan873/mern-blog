import React, { useEffect, useState } from 'react';
import { useParams,Link } from 'react-router-dom';

const BlogDetail = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [newComment, setNewComment] = useState("");
    const [username, setUsername] = useState("Guest");

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await fetch(`https://mern-blog-2-1ko4.onrender.com/blogs/${id}`);
                if (!response.ok) throw new Error("Blog not found");
                const data = await response.json();
                setBlog(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [id]);

    const handleLike = async () => {
        const userId = localStorage.getItem("userId") || "guest";

        try {
            const response = await fetch(`http://localhost:4000/blogs/${id}/like`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Failed to like blog");

            setBlog({ ...blog, likes: data.likes });
        } catch (error) {
            console.error("Like Error:", error);
            alert(error.message);
        }
    };

    const handleComment = async () => {
        if (!newComment.trim()) return;
        try {
            const response = await fetch(`http://localhost:4000/blogs/${id}/comment`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, text: newComment }),
            });
            const data = await response.json();
            if (response.ok) {
                setBlog({ ...blog, comments: data.comments });
                setNewComment("");
            }
        } catch {
            alert("Failed to add comment");
        }
    };

    if (loading) return <p className="text-center text-gray-500">Loading blog...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;
    if (!blog) return <p className="text-center text-gray-500">No blog found.</p>;

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <img src={`http://localhost:4000${blog.image}`} alt={blog.title} className="w-full h-64 object-cover rounded-lg" />
                <h2 className="text-3xl font-bold mt-4">{blog.title}</h2>
                <p className="text-gray-600 mt-2">
    By {blog.author} - {new Date(blog.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    })}
</p>

                <p className="text-gray-700 mt-4">{blog.description}</p>

                {/* Display Blog Sections */}
                {blog.sections && Array.isArray(blog.sections) && blog.sections.length > 0 ? (
                    <div className="mt-6">
                        {blog.sections.map((section, index) => (
                            <div key={index} className="mt-4">
                                <h3 className="text-2xl font-semibold text-gray-800">{section.heading}</h3>
                                <p className="text-gray-700 mt-2">{section.paragraph}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 mt-4">No sections available.</p>
                )}

                {/* Like Button */}
                <button onClick={handleLike} className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
                    ❤️ {blog.likes || 0} Likes
                </button>

                {/* Comments Section */}
                <div className="mt-6">
                    <h3 className="text-xl font-bold">Comments</h3>
                    <div className="mt-2">
                        {blog.comments && Array.isArray(blog.comments) && blog.comments.length > 0 ? (
                            blog.comments.map((comment, index) => (
                                <div key={index} className="border-b border-gray-300 py-2">
                                    <p className="text-sm text-gray-600">
    {comment.username} • {new Date(comment.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    })}
</p>

                                    <p className="text-gray-800">{comment.text}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No comments yet.</p>
                        )}
                    </div>
                </div>

                {/* Add Comment */}
                <div className="mt-4">
                    <input
                        type="text"
                        placeholder="Your name"
                        className="border p-2 w-full rounded mb-2"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <textarea
                        placeholder="Write a comment..."
                        className="border p-2 w-full rounded"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button onClick={handleComment} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                        Add Comment
                    </button>
                </div>
            </div>
             <Link to="/bloglist" className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600">
                      Show More Blogs
                    </Link>
        </div>
    );
};

export default BlogDetail;
