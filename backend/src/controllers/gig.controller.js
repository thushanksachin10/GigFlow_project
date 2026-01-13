import Gig from "../models/Gig.js";

// CREATE GIG (CLIENT ONLY)
export const createGig = async (req, res) => {
  try {
    if (req.user.role !== "client") {
      return res.status(403).json({ message: "Only clients can post gigs" });
    }

    const gig = await Gig.create({
      title: req.body.title,
      description: req.body.description,
      budget: req.body.budget,
      clientId: req.user.id,
    });

    res.status(201).json(gig);
  } catch (err) {
    res.status(500).json({ message: "Failed to create gig" });
  }
};



// GET ALL GIGS + SEARCH
export const getGigs = async (req, res) => {
  try {
    const search = req.query.search || "";

    const gigs = await Gig.find({
      title: { $regex: search, $options: "i" },
    }).sort({ createdAt: -1 });

    res.json(gigs);
  } catch (err) {
    console.error("Get Gigs Error:", err.message);
    res.status(500).json({ message: "Failed to fetch gigs" });
  }
};


// GET SINGLE GIG DETAILS
export const getGigById = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);

    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    res.json(gig);
  } catch (err) {
    console.error("Get Gig Error:", err.message);
    res.status(500).json({ message: "Failed to fetch gig details" });
  }
};
