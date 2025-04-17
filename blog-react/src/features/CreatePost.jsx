import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [heading, setHeading] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
    } else {
      setError("Invalid image file");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!heading || !slug || !description || !image || !author) {
      setError("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("heading", heading);
    formData.append("slug", slug);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("author", author);

    try {
      setLoading(true);
      const response = await axios.post("http://127.0.0.1:8000/api/posts", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      });

      if (response.data.status === "success") {
        navigate('/');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("Failed to create post");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">

        <button
          onClick={() => navigate("/")}
          className="bg-gray-600 text-white px-4 py-2 rounded mb-4"
        >
          Back to Home
        </button>
        <h1 className="text-3xl font-bold mb-4">Create a New Post</h1>

        {error && <div className="bg-red-200 text-red-700 p-3 mb-4 rounded">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Heading</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Slug</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Description</label>
            <textarea
              rows="5"
              className="w-full p-2 border rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Image</label>
            <input
              type="file"
              accept="image/*"
              className="w-full p-2 border rounded"
              onChange={handleImageChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Author</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className={`bg-gray-600 text-white px-6 py-3 rounded mt-4 ${loading ? "opacity-50" : ""}`}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Post"}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default CreatePost;
