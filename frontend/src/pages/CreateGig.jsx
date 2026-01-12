import { useState } from "react";
import { useDispatch } from "react-redux";
import { createGig } from "../store/gigSlice";

export default function CreateGig() {
  const dispatch = useDispatch();
  const [data, setData] = useState({ title: "", description: "", budget: "" });

  const submit = () => dispatch(createGig(data));

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Post a Gig</h1>

      <input className="input" placeholder="Title"
        onChange={(e) => setData({ ...data, title: e.target.value })} />

      <textarea className="input mt-2" placeholder="Description"
        onChange={(e) => setData({ ...data, description: e.target.value })}></textarea>

      <input className="input mt-2" type="number" placeholder="Budget"
        onChange={(e) => setData({ ...data, budget: e.target.value })} />

      <button className="btn bg-blue-600 text-white mt-4" onClick={submit}>
        Create Gig
      </button>
    </div>
  );
}
