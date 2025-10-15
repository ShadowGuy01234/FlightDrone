import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    requirements: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    jobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Internship"],
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    applicationDeadline: {
      type: Date,
    },
    postedBy: {
      type: mongoose.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
