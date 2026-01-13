import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function GigCard({ gig }) {
  const user = useSelector((s) => s.auth.user);

  return (
    <Link to={`/gig/${gig._id}`}>
      <div className="border rounded-lg shadow hover:shadow-lg p-5 transition bg-white">

        {/* Show owner badge */}
        {user?.role === "client" && String(user._id) === String(gig.clientId) && (
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded mb-2 inline-block">
            Your Gig
          </span>
        )}

        <h2 className="text-xl font-semibold mb-2">{gig.title}</h2>

        <p className="text-gray-700 mb-4 line-clamp-3">
          {gig.description}
        </p>

        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-blue-600">
            ₹{gig.budget}
          </span>

          <span className="text-gray-500 text-sm">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
}
