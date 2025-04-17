import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

const PostDetail = () => {
  const post = useLocation().state;

  const [comments, setComments] = useState(post?.comment || []);
  const [newComment, setNewComment] = useState("");
  const [editCommentId, setEditCommentId] = useState(null);
  const [user, setUser] = useState(post?.user || {});
  const imageUrl = `http://127.0.0.1:8000/storage/${post.imageUrl}`;
  const formattedDescription = post.description.replace(/\n/g, "<br />");
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
 
  useEffect(() => {
    if (!user.id) {
      axios.get("/api/user").then((res) => setUser(res.data));
    }
  }, [user]);

  const handleCommentSubmit = async () => {
    if (!newComment) return;

    const commentData = {
      user_id: user.id,
      post_id: post.id,
      body: newComment,
    };

    try {
      let res;
      if (editCommentId) {

        res = await axios.put(
          `http://127.0.0.1:8000/api/comments/${editCommentId}`,
            commentData,{
            headers:{
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        }
          }
        );
        setComments((prev) =>
          prev.map((c) => (c.id === editCommentId ? { ...c, body: newComment } : c))
        );
      } else {

        res = await axios.post(`http://127.0.0.1:8000/api/comments`, commentData,{
                
        });
        setComments((prev) => [...prev, res.data.comment]);
      }


      setNewComment("");
      setEditCommentId(null);
    } catch (error) {
      console.error("Error handling comment submit:", error);
    }
  };

  const handleEdit = (comment) => {
    setNewComment(comment.body);
    setEditCommentId(comment.id);
  };

  const handleDelete = async (commentId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/comments/${commentId}`,{
        headers:{
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleDownload = async () => {
    const payload = {
      heading: post.heading,
      slug: post.slug,
      description: post.description,
      author: post.author,
    };
  
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/download-pdf",
        payload,
        {
          responseType: "blob",
        }
      );

      const contentType = response.headers["content-type"];
      if (contentType !== "application/pdf") {
        console.warn("Unexpected content type:", contentType);
        alert("PDF could not be generated. Please try again later.");
        return;
      }
  
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "blog_post.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("PDF download error:", error);
      alert("Something went wrong while downloading the PDF.");
    }
  };

  if (!post) return <div className="text-center mt-10">No post data found.</div>;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        <button
          onClick={() => navigate("/")}
          className="bg-gray-600 text-white px-4 py-2 rounded mb-4"
        >
          Back to Home
        </button>

        <h1 className="text-3xl font-bold mb-4 text-center">{post.heading}</h1>

        <img
          src={imageUrl}
          alt={post.slug}
          className="mb-6 mx-auto w-96 h-64 object-cover rounded-lg"
        />

        <div
          className="text-gray-700 mb-6"
          dangerouslySetInnerHTML={{ __html: formattedDescription }}
        />

        <p className="text-sm text-gray-500 mb-6">
          By {post.author} ({post.user?.name}) 
          <br/>
          <span>{dayjs(post.created_at).fromNow()}</span>
        </p>

        <div className="flex justify-end mb-4">
          <button
            onClick={handleDownload}
            className="bg-gray-600 text-white px-4 py-2 rounded mb-6 hover:bg-gray-700"
          >
            Download PDF
          </button>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Comments</h2>

          <div>
            <textarea
              rows="3"
              className="w-full p-2 border rounded mb-2"
              placeholder="Write your comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                onClick={handleCommentSubmit}
                className="bg-gray-600 text-white px-4 py-2 rounded mb-4"
              >
                {editCommentId ? "Update" : "Comment"}
              </button>
            </div>
          </div>

          {comments.map((comment) => (
            <div key={comment.id} className="border p-3 rounded mb-2">
              <p>{comment.body}</p>
              <small className="text-gray-500">By {comment.user?.name || "Anonymous"}</small>
              {comment.user_id === user.id && (
                <div className="text-sm mt-2">
                  <button
                    onClick={() => handleEdit(comment)}
                    className="text-blue-500 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default PostDetail;
