import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState(null);
  const [sections, setSections] = useState([{ heading: "", paragraph: "" }]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setAuthor(storedUsername);
    }
  }, []);

  const handleSectionChange = (index, field, value) => {
    const updatedSections = [...sections];
    updatedSections[index][field] = value;
    setSections(updatedSections);
  };

  const addSection = () => {
    setSections([...sections, { heading: "", paragraph: "" }]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("sections", JSON.stringify(sections));
    formData.append("image", image);

    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("User not logged in!");
      return;
    }

    formData.append("userId", userId);

    try {
      const response = await fetch("http://localhost:4000/blogs", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        alert("Blog uploaded successfully!");
        navigate("/"); // ✅ Redirect to Home after successful submit
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Error uploading blog:", error);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Upload Blog</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full mb-2"
          required
        />

        <p className="mb-2 text-gray-700">
          Author: <strong>{author || "Loading..."}</strong>
        </p>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="border p-2 w-full mb-2"
          required
        />

        {sections.map((section, index) => (
          <div key={index} className="mb-4">
            <input
              type="text"
              placeholder="Heading"
              value={section.heading}
              onChange={(e) =>
                handleSectionChange(index, "heading", e.target.value)
              }
              className="border p-2 w-full mb-2"
              required
            />
            <textarea
              placeholder="Paragraph"
              value={section.paragraph}
              onChange={(e) =>
                handleSectionChange(index, "paragraph", e.target.value)
              }
              className="border p-2 w-full mb-2"
              required
            />
          </div>
        ))}

        <button
          type="button"
          onClick={addSection}
          className="bg-gray-300 px-4 py-2 rounded mb-2"
        >
          Add Section
        </button>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
