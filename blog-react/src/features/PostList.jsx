import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPost } from "./post/PostSlice";

const PostList = () => {

    const dispatch = useDispatch();
    const [search, setSearch] = useState("");
    const {loading, error, posts} = useSelector((state) => state.post);

    useEffect(()=>{
        dispatch(fetchPost());
    },[dispatch]);
    

    // search
    const searchValue = (e)=>{
        setSearch(e.target.value);
    }


    return ( 
        <div>
            {/* Search */}
            <div>
                <input type="text" value={search} name="search" onChange={searchValue} />
            </div>
            {/* Loading */}
            {
                loading && "Loading ..."
            }
            {/* Error */}
            {
                error && <div>{error}</div>
            }
            <h1>Latest Blogs</h1>
            { posts && posts.map((post)=>(
                <div key={post.id}>
                    <img src={post.image} />
                    <div>
                        <h2>{post.heading}</h2>
                        <p>{post.author}  | {post.created_at}</p>
                        <p>{post.slug}</p>
                        <Link to={`post/${post.id}`}>Read More</Link>
                    </div>
                </div>
            ))
            }
        </div>
     );
}
 
export default PostList;