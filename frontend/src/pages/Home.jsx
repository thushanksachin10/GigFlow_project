import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGigs } from "../store/gigSlice";
import GigCard from "../components/GigCard";

export default function Home() {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);
  const gigs = useSelector((s) => s.gigs.list);

  
  useEffect(() => {
    if (user) {
      dispatch(fetchGigs());
    }
  }, [user]);

 
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
