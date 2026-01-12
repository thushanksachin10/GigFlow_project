import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";

export default function Login() {
  const dispatch = useDispatch();
  const [data, setData] = useState({ email: "", password: "" });

  const submit = () => dispatch(login(data));

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded">
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      <input
        className="input"
        placeholder="Email"
        onChange={(e) => setData({ ...data, email: e.target.value })}
      />

      <input
        className="input mt-2"
        type="password"
        placeholder="Password"
        onChange={(e) => setData({ ...data, password: e.target.value })}
      />

      <button className="btn bg-blue-600 text-white mt-4" onClick={submit}>
        Login
      </button>
    </div>
  );
}
