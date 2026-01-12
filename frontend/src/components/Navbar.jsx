import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navbar() {
  const user = useSelector((s) => s.auth.user);

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <Link to="/" className="font-bold text-xl">GigFlow</Link>

      <div className="space-x-4">
        {user ? (
          <>
            <Link to="/create-gig">Post Gig</Link>
            <span>{user.name}</span>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
