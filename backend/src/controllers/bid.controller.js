import Bid from "../models/Bid.js";
import Gig from "../models/Gig.js";

// CREATE BID (Freelancers only)
export const createBid = async (req, res) => {
  try {
    const { gigId, message, amount } = req.body;

    if (req.user.role !== "freelancer") {
      return res.status(403).json({ message: "Only freelancers can bid" });
    }

    const bid = await Bid.create({
      gigId,
      freelancerId: req.user.id,
      message,
      amount,
    });

    const populated = await bid.populate("freelancerId", "name email");

    res.status(201).json(populated);
  } catch (err) {
    console.error("CreateBid Error:", err.message);
    res.status(500).json({ message: "Failed to create bid" });
  }
};

// GET BIDS FOR SPECIFIC GIG
export const getBidsForGig = async (req, res) => {
  try {
    const gigId = req.params.gigId;

    const bids = await Bid.find({ gigId })
      .populate("freelancerId", "name email")
      .sort({ createdAt: -1 });

    res.json(bids);
  } catch (err) {
    console.error("Fetch Bids Error:", err.message);
    res.status(500).json({ message: "Failed to fetch bids" });
  }
};

// HIRE FREELANCER (Client Only)
export const hireBid = async (req, res) => {
  try {
    const bidId = req.params.bidId;

    // Find bid
    const bid = await Bid.findById(bidId);
    if (!bid) return res.status(404).json({ message: "Bid not found" });

    // Make sure the requester is the gig owner
    const gig = await Gig.findById(bid.gigId);

    if (!gig) return res.status(404).json({ message: "Gig not found" });

    if (gig.clientId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to hire" });
    }

    // Update bid status
    bid.status = "hired";
    await bid.save();

    const populated = await bid.populate("freelancerId", "name email");

    res.json(populated);
  } catch (err) {
    console.error("HireBid Error:", err.message);
    res.status(500).json({ message: "Failed to hire freelancer" });
  }
};
