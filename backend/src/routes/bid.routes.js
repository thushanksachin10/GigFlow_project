import express from "express";
import { createBid, getBidsForGig, hireBid } from "../controllers/bid.controller.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Freelancer creates a bid
router.post("/", protect, createBid);

// Get bids for ONE gig
router.get("/gig/:gigId", protect, getBidsForGig);

// Client hires a freelancer
router.patch("/:bidId/hire", protect, hireBid);

export default router;
