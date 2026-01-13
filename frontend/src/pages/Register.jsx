import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!data.name || !data.email || !data.password || !data.role) {
      alert("Please fill all fields including Role");
      return;
    }

    setLoading(true);
    await dispatch(register(data));
    setLoading(false);

    navigate("/login");
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white shadow-lg p-8 rounded-lg border border-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Create Account
      </h1>

      {/* Name */}
      <label className="block font-semibold mb-1">Name</label>
      <input
        className="input"
        placeholder="Your Name"
        onChange={(e) => setData({ ...data, name: e.target.value })}
      />

      {/* Email */}
      <label className="block font-semibold mt-4 mb-1">Email</label>
      <input
        className="input"
        placeholder="name@example.com"
        onChange={(e) => setData({ ...data, email: e.target.value })}
      />

      {/* Password */}
      <label className="block font-semibold mt-4 mb-1">Password</label>
      <input
        className="input"
        type="password"
        placeholder="Enter Password"
        onChange={(e) => setData({ ...data, password: e.target.value })}
      />

      {/* ROLE SELECT (THIS IS THE IMPORTANT PART) */}
      <label className="block font-semibold mt-4 mb-1">Select Role</label>
      <select
        className="input mt-2"
        onChange={(e) => setData({ ...data, role: e.target.value })}
      >
        <option value="">Choose role</option>
        <option value="client">Client</option>
        <option value="freelancer">Freelancer</option>
      </select>

      {/* Submit button */}
      <button
        className="btn bg-blue-600 text-white w-full mt-6 py-3 text-lg font-semibold rounded-lg shadow hover:bg-blue-700 transition"
        onClick={submit}
        disabled={loading}
      >
        {loading ? "Creating Account..." : "Register"}
      </button>

      {/* Link to login */}
      <p className="text-center mt-4 text-sm">
        Already have an account?{" "}
        <span
          className="text-blue-600 font-semibold cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Login here
        </span>
      </p>
    </div>
  );
}
