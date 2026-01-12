import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createGig } from "../store/gigSlice";
import { useNavigate } from "react-router-dom";

export default function CreateGig() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({
    title: "",
    description: "",
    budget: "",
  });

  const [loading, setLoading] = useState(false);
  const user = useSelector((s) => s.auth.user);

  const submit = async () => {
    if (!data.title || !data.description || !data.budget) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    await dispatch(createGig(data));
    setLoading(false);

    navigate("/"); 
  };

  return (
    <div className="max-w-xl mx-auto mt-12 bg-white shadow-lg p-8 rounded-lg border border-gray-200">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        Post a New Gig
      </h1>

      {/* Title */}
      <label className="block font-semibold mb-1">Gig Title</label>
      <input
        className="input"
        placeholder="Enter gig title e.g. Logo Design"
        onChange={(e) => setData({ ...data, title: e.target.value })}
      />

      {/* Description */}
      <label className="block font-semibold mt-4 mb-1">Description</label>
      <textarea
        className="input h-32 resize-none"
        placeholder="Describe your project and expectations..."
        onChange={(e) => setData({ ...data, description: e.target.value })}
      ></textarea>

      {/* Budget */}
      <label className="block font-semibold mt-4 mb-1">Budget (₹)</label>
      <input
        className="input"
        type="number"
        placeholder="Enter your budget"
        onChange={(e) => setData({ ...data, budget: e.target.value })}
      />

      {/* Submit Button */}
      <button
        className="btn bg-blue-600 text-white w-full mt-6 py-3 text-lg font-semibold rounded-lg shadow hover:bg-blue-700 transition"
        onClick={submit}
        disabled={loading}
      >
        {loading ? "Posting..." : "Post Gig"}
      </button>
    </div>
  );
}
