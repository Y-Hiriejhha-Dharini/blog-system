import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import axios from "axios";

dayjs.extend(relativeTime);

const BlogCard = ({ blog }) => {
  const imageUrl = `http://127.0.0.1:8000/storage/${blog.imageUrl}`;
  const navigate = useNavigate();

  const handleShow = (post) => {
    axios.get(`http://localhost:8000/api/viewed/${post.id}`);
    navigate(`/post_details`, { state: post });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg hover:shadow-xl transition-all w-full sm:w-64 md:w-72 lg:w-80 p-4">
      <img
        src={imageUrl}
        className="w-full h-48 object-cover rounded-t-lg"
        alt={blog.title}
      />

      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {blog.heading}
        </h2>

        <p className="text-sm text-gray-600 mb-3 truncate">{blog.slug}</p>

        <div className="flex justify-between text-xs text-gray-500">
          <span className="font-medium">{blog.author}</span>
          <span>{dayjs(blog.created_at).fromNow()}</span>
        </div>

        <div className="mt-4">
          <button
            onClick={() => handleShow(blog)}
            className="bg-gray-500 text-white py-2 px-4 rounded-full hover:bg-gray-600 transition-all w-full"
          >
            Show
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
