import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.ObjectId,
      ref: "Job",
      required: true,
    },
    applicantName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    position: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "reviewed", "shortlisted", "rejected", "hired"],
      default: "pending",
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("JobApplication", jobApplicationSchema);
