import { Link } from "react-router-dom";

export default function GigCard({ gig }) {
  return (
    <Link to={`/gig/${gig._id}`}>
      <div className="border p-4 rounded shadow hover:bg-gray-100">
        <h2 className="text-xl font-semibold">{gig.title}</h2>
        <p>{gig.description}</p>
        <p className="font-bold mt-2">₹{gig.budget}</p>
      </div>
    </Link>
  );
}
