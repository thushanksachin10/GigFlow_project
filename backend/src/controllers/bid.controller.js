import mongoose from "mongoose";
import Gig from "../models/Gig.js";
import Bid from "../models/Bid.js";

export const createBid = async (req, res) => {
  const bid = await Bid.create({ ...req.body, freelancerId: req.user });
  res.json(bid);
};

export const getBidsForGig = async (req, res) => {
  const bids = await Bid.find({ gigId: req.params.gigId });
  res.json(bids);
};

export const hireBid = async (req, res) => {
  const { bidId } = req.params;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const bid = await Bid.findById(bidId).session(session);
    if (!bid) throw new Error("Bid not found");

    const gig = await Gig.findById(bid.gigId).session(session);
    if (gig.status !== "open") throw new Error("Gig already assigned");

    gig.status = "assigned";
    await gig.save({ session });

    bid.status = "hired";
    await bid.save({ session });

    await Bid.updateMany(
      { gigId: gig._id, _id: { $ne: bidId } },
      { $set: { status: "rejected" } },
      { session }
    );

    await session.commitTransaction();
    res.json({ message: "Hired successfully" });
  } catch (err) {
    await session.abortTransaction();
    res.status(400).json({ error: err.message });
  }
};