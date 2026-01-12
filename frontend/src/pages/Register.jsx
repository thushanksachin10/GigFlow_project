import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../store/authSlice";

export default function Register() {
  const dispatch = useDispatch();
  const [data, setData] = useState({ name: "", email: "", password: "" });

  const submit = () => dispatch(register(data));

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded">
      <h1 className="text-2xl font-bold mb-4">Register</h1>

      <input className="input" placeholder="Name"
        onChange={(e) => setData({ ...data, name: e.target.value })} />

      <input className="input mt-2" placeholder="Email"
        onChange={(e) => setData({ ...data, email: e.target.value })} />

      <input className="input mt-2" type="password" placeholder="Password"
        onChange={(e) => setData({ ...data, password: e.target.value })} />

      <button className="btn bg-blue-600 text-white mt-4" onClick={submit}>
        Register
      </button>
    </div>
  );
}
