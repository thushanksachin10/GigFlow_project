import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchGigById } from "../store/gigSlice";
import { fetchBids, createBid, hireBid } from "../store/bidSlice";

export default function GigDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const user = useSelector((s) => s.auth.user);
  const gig = useSelector((s) => s.gigs.selectedGig);
  const bids = useSelector((s) => s.bids.list);

  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState("");

  const isOwner = gig && user && gig.clientId === user._id;

  // Load gig + bids
  useEffect(() => {
    dispatch(fetchGigById(id));
    dispatch(fetchBids(id));
  }, [id]);

  const handleBidSubmit = () => {
    if (!message || !amount) return alert("Fill all fields");
    dispatch(createBid({ gigId: id, message, amount }));
    setMessage("");
    setAmount("");
  };

  const handleHire = (bidId) => {
    dispatch(hireBid({ bidId }));
  };

  if (!gig) {
    return (
      <div className="text-center p-10 text-gray-500 text-xl">
        Loading gig details...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg p-8 rounded-lg border border-gray-200">

      {/* HEADER */}
      <h1 className="text-3xl font-bold text-blue-700">{gig.title}</h1>
      <p className="text-gray-600 mt-3">{gig.description}</p>

      <div className="mt-4 text-2xl font-semibold text-green-600">
        Budget: ₹{gig.budget}
      </div>

      {/* FREELANCER BID FORM */}
      {!isOwner && user?.role === "freelancer" && (
        <div className="mt-10 border-t pt-6">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Place Your Bid</h2>

          <textarea
            className="input w-full min-h-[100px] resize-none p-3 border rounded mb-3"
            placeholder="Your proposal message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <input
            type="number"
            className="input w-full p-3 border rounded mb-3"
            placeholder="Your bid amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <button
            onClick={handleBidSubmit}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
          >
            Submit Bid
          </button>
        </div>
      )}

      {/* CLIENT VIEW — LIST OF BIDS */}
      {isOwner && (
        <div className="mt-12 border-t pt-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Bids Received</h2>

          {bids.length === 0 ? (
            <p className="text-gray-500">No bids yet.</p>
          ) : (
            bids.map((bid) => (
              <div
                key={bid._id}
                className={`p-5 mb-4 rounded border shadow-sm ${
                  bid.status === "hired"
                    ? "bg-green-50 border-green-400"
                    : "bg-gray-50"
                }`}
              >
                <p className="text-lg font-semibold">
                  {bid.freelancerId?.name || "Freelancer"}
                </p>

                <p className="text-gray-600 mt-1">
                  {bid.message}
                </p>

                <p className="mt-2 text-lg font-bold text-blue-700">
                  Amount: ₹{bid.amount}
                </p>

                {bid.status === "pending" ? (
                  <button
                    onClick={() => handleHire(bid._id)}
                    className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                  >
                    Hire This Freelancer
                  </button>
                ) : (
                  <p className="mt-3 text-green-700 font-semibold">
                    ✔ Hired
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
