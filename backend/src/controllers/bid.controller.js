import Bid from "../models/Bid.js";

export const createBid = async (req, res) => {
  const bid = await Bid.create({ ...req.body, freelancerId: req.user });
  res.json(bid);
};

export const getBidsForGig = async (req, res) => {
  const bids = await Bid.find({ gigId: req.params.gigId });
  res.json(bids);
};
