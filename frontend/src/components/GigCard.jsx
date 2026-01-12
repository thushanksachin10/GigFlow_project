import { Link } from "react-router-dom";

export default function GigCard({ gig }) {
  return (
    <Link to={`/gig/${gig._id}`}>
      <div className="border rounded-lg shadow hover:shadow-lg p-5 transition bg-white">
        <h2 className="text-xl font-semibold mb-2">{gig.title}</h2>
        <p className="text-gray-700 mb-4 line-clamp-3">{gig.description}</p>
        <span className="text-lg font-bold text-blue-600">₹{gig.budget}</span>
      </div>
    </Link>
  );
}
