import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGigs } from "../store/gigSlice";
import GigCard from "../components/GigCard";

export default function Home() {
  const dispatch = useDispatch();
  const gigs = useSelector((s) => s.gigs.list);

  useEffect(() => {
    dispatch(fetchGigs());
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      {gigs.map((g) => (
        <GigCard key={g._id} gig={g} />
      ))}
    </div>
  );
}
