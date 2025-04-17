import { Route, Routes, Navigate } from "react-router-dom";
import Register from "./features/Register";
import Login from "./features/Login";
import Home from "./features/Home";
import PostDetail from "./features/PostDetail";
import CreatePost from "./features/CreatePost";
import { useSelector } from "react-redux";

function App() {

  const { token } = useSelector((state) => state.auth);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/post_details" element={<PostDetail/>} />
        <Route
          path="/create_post"
          element={token ? <CreatePost /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </div>
  )
}

export default App
