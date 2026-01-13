import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((s) => s.auth.user);

  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  // Auto redirect if already logged in
  useEffect(() => {
    if (user?.role === "client") navigate("/create-gig");
    if (user?.role === "freelancer") navigate("/");
  }, [user, navigate]);

  const submit = async () => {
    if (!data.email || !data.password) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    const result = await dispatch(login(data)); // login request
    setLoading(false);

    const loggedInUser = result.payload;

    // role-based redirect
    if (loggedInUser?.role === "client") {
      navigate("/create-gig");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white shadow-lg p-8 rounded-lg border border-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Login to Your Account
      </h1>

      {/* Email */}
      <label className="block font-semibold mb-1">Email</label>
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

      {/* Submit */}
      <button
        className="btn bg-blue-600 text-white w-full mt-6 py-3 text-lg font-semibold rounded-lg shadow hover:bg-blue-700 transition"
        onClick={submit}
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      {/* Link to register */}
      <p className="text-center mt-4 text-sm">
        Don’t have an account?{" "}
        <span
          className="text-blue-600 font-semibold cursor-pointer"
          onClick={() => navigate("/register")}
        >
          Register here
        </span>
      </p>
    </div>
  );
}
