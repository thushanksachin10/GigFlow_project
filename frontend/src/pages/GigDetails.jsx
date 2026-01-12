import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchBids, submitBid, hireBid } from "../store/bidSlice";

export default function GigDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const bids = useSelector((s) => s.bids.list);
  const user = useSelector((s) => s.auth.user);

  const [message, setMessage] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    dispatch(fetchBids(id));
  }, [id]);

  const submit = () => {
    dispatch(submitBid({ gigId: id, message, price }));
  };

  return (
    <div className="mt-6">
      <h1 className="text-xl font-bold">Gig Bids</h1>

      {user && (
        <div className="p-4 border rounded my-4">
          <input className="input" placeholder="Bid Message" onChange={(e) => setMessage(e.target.value)} />
          <input className="input mt-2" type="number" placeholder="Bid Price" onChange={(e) => setPrice(e.target.value)} />
          <button className="btn bg-green-600 text-white mt-4" onClick={submit}>Submit Bid</button>
        </div>
      )}

      <div className="space-y-3">
        {bids.map((b) => (
          <div key={b._id} className="border p-4 rounded flex justify-between">
            <div>
              <p>{b.message}</p>
              <p className="font-bold">₹{b.price}</p>
              <p>Status: {b.status}</p>
            </div>

            {/* Only owner sees Hire button */}
            {user && user._id === b.freelancerId && b.status === "hired" && (
              <span className="text-green-600 font-bold">HIRED</span>
            )}

            {user && user._id === b.gigOwner && (
              <button
                className="btn bg-blue-600 text-white"
                onClick={() => dispatch(hireBid(b._id))}
              >
                Hire
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
