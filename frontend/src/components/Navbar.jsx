import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../store/authSlice";

export default function Navbar() {
  const user = useSelector((s) => s.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-wide">GigFlow</Link>

        <div className="flex gap-4 items-center">
          {user ? (
            <>
              {user.role === "client" && (
                <Link
                  to="/create-gig"
                  className="px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg shadow"
                >
                  + Post Gig
                </Link>
              )}

              <span className="font-semibold">{user.name}</span>

              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 rounded-lg font-semibold shadow"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline font-semibold">Login</Link>
              <Link to="/register" className="hover:underline font-semibold">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
