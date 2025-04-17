import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../features/auth/authSlice'; 

const Layout = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth_token");      
    dispatch(logout());                      
    navigate("/login");                      
  };

  return (
    <div>
      <div className="flex mb-6 justify-end bg-gray-800 text-white shadow-md">
        {!token ? (
          <>
            <Link to="/login" className="px-4 py-2 hover:rounded-lg hover:bg-gray-700 hover:shadow-md transition">
              Login
            </Link>
            <Link to="/register" className="px-4 py-2 hover:rounded-lg hover:bg-gray-700 hover:shadow-md transition">
              Register
            </Link>
          </>
        ):(
            <>
            <Link to="/create_post" className="px-4 py-2 hover:rounded-lg hover:bg-gray-700 hover:shadow-md transition">
              Create Post
            </Link>
                <button
                onClick={handleLogout}
                className="px-4 py-2 hover:rounded-lg hover:bg-gray-700 hover:shadow-md transition"
                >
                Logout
                </button>
            </>
        )}
      </div>

      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;
