import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGigs } from "../store/gigSlice";
import GigCard from "../components/GigCard";
import { Link } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);
  const gigs = useSelector((s) => s.gigs.list);

  useEffect(() => {
    if (user) {
      dispatch(fetchGigs());
    }
  }, [user]);

  // If no login -> show landing page
  if (!user) {
    return (
      <div className="flex flex-col items-center text-center mt-20">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Welcome to GigFlow
        </h1>

        <p className="text-gray-700 text-lg mb-6 max-w-lg">
          GigFlow is a simple freelance marketplace where you can post gigs,
          receive bids, and hire freelancers. Login or register to get started!
        </p>

        <div className="flex gap-4">
          <a
            href="/login"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
          >
            Login
          </a>

          <a
            href="/register"
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300"
          >
            Register
          </a>
        </div>
      </div>
    );
  }

  // ============================
  // ROLE BASED UI
  // ============================

  // ✔ CLIENT VIEW
  if (user.role === "client") {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6">Your Posted Gigs</h1>

        <Link to="/create-gig">
          <button className="mb-6 px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
            + Post New Gig
          </button>
        </Link>

        {gigs.length === 0 ? (
          <p className="text-gray-500">You haven't posted any gigs yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {gigs.map((g) => (
              <GigCard key={g._id} gig={g} />
            ))}
          </div>
        )}
      </div>
    );
  }

  // ✔ FREELANCER VIEW
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Available Gigs</h1>

      {gigs.length === 0 ? (
        <p className="text-gray-500">No gigs posted yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {gigs.map((g) => (
            <GigCard key={g._id} gig={g} />
          ))}
        </div>
      )}
    </div>
  );
}
