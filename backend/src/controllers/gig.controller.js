import Gig from "../models/Gig.js";

export const createGig = async (req, res) => {
  const gig = await Gig.create({ ...req.body, ownerId: req.user, clientId: req.user });
  res.json(gig);
};

export const getGigs = async (req, res) => {
  const search = req.query.search || "";
  const gigs = await Gig.find({
    title: { $regex: search, $options: "i" },
    status: "open",
  });
  res.json(gigs);
};

export const getGigById = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id).lean();

    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    res.json(gig);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
