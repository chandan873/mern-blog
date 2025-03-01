import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./BlogSection.css";
import IMG from "../assets/best-psychiatrists.jpg";

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://mern-blog-2-1ko4.onrender.com/blogs")
      .then((response) => {
        if (response.data && Array.isArray(response.data)) {
          const sortedBlogs = response.data.sort(
            (a, b) =>
              (b.likes || 0) + (b.comments?.length || 0) -
              ((a.likes || 0) + (a.comments?.length || 0))
          );
          setBlogs(sortedBlogs.slice(0, 2)); // Show top 2 blogs
        }
      })
      .catch((error) => console.error("Error fetching blogs:", error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-center p-8 text-lg font-semibold">Loading blogs...</div>;
  }

  return (
    <>
      <div className="flex flex-col md:flex-row w-full h-auto md:h-[85vh]">
        {/* Left Section - Background Image */}
        <div
          className="w-full md:w-1/2 h-[50vh] md:h-[85vh] bg-cover bg-center"
          style={{ backgroundImage: `url(${IMG})` }}
        ></div>

        {/* Right Section - Blog Content */}
        <div className="w-full md:w-1/2 px-4 md:px-6 py-6">
          <h2 className="text-2xl font-bold text-center mb-6">Latest Blogs</h2>

          {blogs.length > 0 ? (
            <div className="flex flex-col gap-6 w-full">
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 w-full h-auto md:h-[35vh] flex flex-col md:flex-row"
                >
                  {/* Blog Image */}
                  <div className="w-full md:w-1/2 h-[200px] md:h-full">
                    {blog.image && (
                      <img
                        src={`https://mern-blog-2-1ko4.onrender.com${blog.image}`}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  {/* Blog Content */}
                  <div className="w-full md:w-1/2 p-4 flex flex-col justify-between">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">
                        BY <span className="font-semibold">{blog.author}</span> |{" "}
                        {blog.createdAt
                          ? new Date(blog.createdAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })
                          : "Date not available"}
                      </p>

                      <h1 className="text-lg font-semibold line-clamp-2">{blog.title}</h1>
                      <p className="text-gray-700 text-sm mt-2 line-clamp-3">
                        {blog.sections?.[0]?.paragraph
                          ? blog.sections[0].paragraph.slice(0, 80) + "..."
                          : "No description available."}
                      </p>
                    </div>

                    {/* Likes, Comments, and Read More */}
                    <div className="flex justify-between items-center text-gray-600 text-xs mt-2">
                      <p>❤️ {blog.likes || 0} Likes</p>
                      <p>💬 {blog.comments?.length || 0} Comments</p>
                    </div>

                    <Link
                      to={`/blogs/${blog._id}`}
                      className="text-blue-500 font-semibold mt-3 inline-block"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">No trending blogs available.</p>
          )}
        </div>
      </div>

      {/* Show More Blogs Button OUTSIDE the container */}
      <div className="flex justify-center mt-6">
        <Link
          to="/bloglist"
          className="bg-[#0FB8CD] text-white px-6 py-3 rounded-md shadow-md hover:bg-[#1F2F4F] transition duration-200"
        >
          Show More Blogs
        </Link>
      </div>
    </>
  );
};

export default BlogSection;
