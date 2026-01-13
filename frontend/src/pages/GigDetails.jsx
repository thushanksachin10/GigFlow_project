import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGigById } from "../store/gigSlice";
import { fetchBids, createBid, hireBid } from "../store/bidSlice";
import { useParams } from "react-router-dom";

export default function GigDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const gig = useSelector((s) => s.gigs.selectedGig);
  const bids = useSelector((s) => s.bids.list);
  const user = useSelector((s) => s.auth.user);

  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    dispatch(fetchGigById(id));
    dispatch(fetchBids(id));
  }, [id]);

  const handleBidSubmit = async () => {
    if (!message || !amount) {
      alert("Please enter message and amount");
      return;
    }

    await dispatch(
      createBid({
        gigId: id,
        message,
        amount,
      })
    );

    dispatch(fetchBids(id));
    setMessage("");
    setAmount("");
  };

  if (!gig) {
    return <div className="text-center mt-12">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-12">

      {/* GIG DETAILS */}
      <div className="bg-white p-8 rounded-lg shadow border border-gray-200 mb-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">{gig.title}</h1>
        <p className="text-gray-700 mb-4">{gig.description}</p>
        <p className="text-xl font-semibold text-green-600">
          Budget: ₹{gig.budget}
        </p>
      </div>

      {/* BID FORM – only for freelancers */}
      {user && gig && user._id !== gig.clientId && (
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200 mb-8">
          <h3 className="text-xl font-bold mb-4 text-blue-600">Submit a Bid</h3>

          <input
            type="text"
            className="input mb-3"
            placeholder="Enter your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <input
            type="number"
            className="input mb-3"
            placeholder="Enter bid amount..."
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <button
            className="px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
            onClick={handleBidSubmit}
          >
            Submit Bid
          </button>
        </div>
      )}

      {/* BIDS LIST */}
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

                  <p
                    className={`mt-2 font-semibold ${
                      b.status === "hired"
                        ? "text-green-600"
                        : b.status === "rejected"
                        ? "text-red-600"
                        : "text-gray-600"
                    }`}
                  >
                    Status: {b.status}
                  </p>
                </div>

                {/* HIRE BUTTON – only for gig owner */}
                {user &&
                  gig &&
                  String(user._id) === String(gig.clientId)
 &&
                  b.status !== "hired" && (
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
                      onClick={() =>
                        dispatch(hireBid(b._id)).then(() =>
                          dispatch(fetchBids(id))
                        )
                      }
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
