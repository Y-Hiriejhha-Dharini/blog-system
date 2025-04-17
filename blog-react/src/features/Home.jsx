import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import Cards from "../components/BlogCard";
import { useEffect, useState } from "react";
// import axios from "axios";
import { fetchPost } from "../features/post/PostSlice";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {

  const [search, setSearch] = useState("");
  // const [blogs, setBlogs] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  // const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const posts = useSelector((state) => state.post);
  const dispatch = useDispatch();


  useEffect(()=>{
    const delayDebounce = setTimeout(() => {
      dispatch(fetchPost({ page, search }));
    }, 500);
  
    return () => clearTimeout(delayDebounce);
      // const fetchData = async () =>{
      //     setLoading(true);
      //     setError(false);

           
      //     try {
            // const response = await axios.get(`http://127.0.0.1:8000/api/posts?page=${page}&search=${search}`,{
            //   headers:{
            //     "Content-Type": "application/json",
            //     "Accept":"application/json"
            //     },
            //   })
            
            //   setBlogs(response.data.data.data);
            //   setPagination(response.data.data);
            //   console.log("Fetched page:", page, response.data.data);

      //         setBlogs(posts.data.data);
      //         console.log(posts);
      //         setPagination(posts.data.data);

      //     } catch (error) {
      //       setError(error.message || "Sometging went wrong");
      //     } finally{
      //       setLoading(false);
      //     }
      // }

      // fetchData();

  },[dispatch, search, page]);

  const handlePageChange = (url) => {
    if (url) {
      const newPage = new URL(url).searchParams.get("page");
      setPage(Number(newPage));
    }
  };
  console.log(posts.post.data);
  
  const blogs = posts?.post?.data?.data || [];
  const pagination = posts?.post?.data || {};

  return (
    <Layout>
        {
          posts.loading && <Loading/>
        }
        {
          posts.error && <Error error={posts.error}/>
        }
          <div className="max-w-7xl mx-auto p-4">
          
          <div className="flex justify-end mb-4">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title..."
              className="border p-2 rounded w-full sm:w-64"
            />
          </div>

          <h1 className="text-3xl font-bold mb-4 text-center">Blogs</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {
              blogs.map((blog)=>(
                <Cards 
                  key={blog.id}
                  blog={blog}/>
              ))
            }
          </div>

          <div className="flex justify-center mt-8 flex-wrap gap-2">
          {pagination.links?.map((link, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(link.url)}
                dangerouslySetInnerHTML={{ __html: link.label }}
                className={`px-4 py-2 border rounded ${
                  link.active ? "bg-gray-600 text-white" : "text-gray-700 hover:bg-gray-100"
                } ${!link.url ? "cursor-not-allowed text-gray-400" : ""}`}
                disabled={!link.url}
              />
            ))}
          </div>

        </div>
    </Layout>
  );
}
