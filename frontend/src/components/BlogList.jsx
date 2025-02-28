import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem("userId")); // Initialize userId correctly

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:4000/blogs");
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleDelete = async (blogId) => {
    if (!userId) {
      alert("User not logged in!");
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/blogs/${blogId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Blog deleted successfully!");
        setBlogs(blogs.filter((blog) => blog._id !== blogId)); // Remove deleted blog from state
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Latest Blogs
      </h2>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 text-sm w-[280px] mx-auto"
          >
            {/* Blog Image */}
            {blog.image && (
              <img
                src={`http://localhost:4000${blog.image}`}
                alt={blog.title}
                className="w-full h-36 object-cover"
              />
            )}

            {/* Blog Content */}
            <div className="p-3">
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                {blog.title}
              </h3>
              <p className="text-gray-600 text-xs mb-2">By {blog.author}</p>

              {/* Blog Preview */}
              <p className="text-gray-700 mb-3 line-clamp-2">
                {blog.sections?.[0]?.paragraph
                  ? blog.sections[0].paragraph.slice(0, 80) + "..."
                  : "No content available."}
              </p>

              {/* Likes & Comments */}
              <div className="flex justify-between items-center text-gray-500 text-xs">
                <p>❤️ {blog.likes || 0} Likes</p>
                <p>💬 {blog.comments?.length || 0} Comments</p>
              </div>

              {/* Read More Button */}
              <Link
                to={`/blogs/${blog._id}`}
                className="block mt-2 text-blue-500 font-medium text-center hover:text-blue-600"
              >
                Read More →
              </Link>

              {/* Show Delete Button Only if Logged-in User is the Author */}
              {userId === blog.authorId && (
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="mt-3 w-full bg-red-500 text-white py-1 rounded hover:bg-red-600 transition"
                >
                  Delete Blog
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
