import express from "express";
import { createGig, getGigs, getGigById } from "../controllers/gig.controller.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// PUBLIC: get all gigs
router.get("/", getGigs);

// PUBLIC: get details of one gig
router.get("/details/:id", getGigById);

// PROTECTED: create gig
router.post("/", protect, createGig);

export default router;
