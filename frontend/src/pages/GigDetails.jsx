import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGigById } from "../store/gigSlice";
import { fetchBids, hireBid } from "../store/bidSlice";
import { useParams } from "react-router-dom";

export default function GigDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const gig = useSelector((s) => s.gigs.selectedGig);
  const bids = useSelector((s) => s.bids.list);
  const user = useSelector((s) => s.auth.user);

  useEffect(() => {
    dispatch(fetchGigById(id));
    dispatch(fetchBids(id));
  }, [id]);

  if (!gig) return <div className="text-center mt-12">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto mt-12">
      {/* GIG DETAILS CARD */}
      <div className="bg-white p-8 rounded-lg shadow border border-gray-200 mb-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">{gig.title}</h1>
        <p className="text-gray-700 mb-4">{gig.description}</p>
        <p className="text-xl font-semibold text-green-600">
          Budget: ₹{gig.budget}
        </p>
      </div>

      {/* BIDS SECTION */}
      <h2 className="text-2xl font-bold mb-4">Bids</h2>

      {bids.length === 0 ? (
        <p className="text-gray-500">No bids yet. Be the first to bid!</p>
      ) : (
        <div className="flex flex-col gap-4">
          {bids.map((b) => (
            <div
              key={b._id}
              className="bg-white p-6 rounded-lg shadow border border-gray-200"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-lg">{b.message}</p>
                  <p className="text-blue-600 font-bold">₹{b.amount}</p>

                  {/* Status colors */}
                  <p
                    className={`mt-2 font-semibold ${
                      b.status === "hired"
                        ? "text-green-600"
                        : b.status === "rejected"
                        ? "text-red-600"
                        : "text-gray-500"
                    }`}
                  >
                    Status: {b.status}
                  </p>
                </div>

                {/* HIRE BUTTON (only gig owner sees it) */}
                {user &&
                  gig &&
                  user._id === gig.clientId &&
                  b.status !== "hired" && (
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
                      onClick={() => dispatch(hireBid(b._id))}
                    >
                      Hire
                    </button>
                  )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
