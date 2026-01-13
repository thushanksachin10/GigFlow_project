import mongoose from "mongoose";

const gigSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    budget: { type: Number, required: true },

    // Client (owner of the gig)
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Gig", gigSchema);
