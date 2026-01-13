import mongoose from "mongoose";

const bidSchema = new mongoose.Schema({
  gigId: { type: mongoose.Schema.Types.ObjectId, ref: "Gig" },
  freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  message: String,
  amount: Number,
  status: { type: String, default: "pending" }
});

const Bid = mongoose.model("Bid", bidSchema);

export default Bid;
