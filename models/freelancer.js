import mongoose from "mongoose";
import { Note, NoteSchema } from "./note";

const freelancerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  avatar: {
    type: String,
    trim: true,
    default: "",
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: (value) => {
        const re =
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return value.match(re);
      },
      message: "Please enter a valid email address",
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: (value) => {
        return value.length > 6;
      },
      message: "Please enter a long password",
    },
  },
  schedule: [
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      start: {
        type: Date,
        required: true,
      },
      end: {
        type: Date,
        required: true,
      },
      duration: {
        type: Date,
        required: true,
      },
      dependencies: {
        type: [String],
        default: [],
      },
    },
  ],
  role: {
    type: String,
    default: "freelancer",
  },
  notes: [NoteSchema],
  agency: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agency",
    },
  ],
  jobs_hired :{
    type: [{
      job_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "AgencyJobs",
      },
      hired_date:{
        type: Date,
        default: Date.now,
      },
      agency_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Agency",
      },
    }],
    default: []
  },
  jobApplications: [
    {
      jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
      status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending",
      },
      appliedDate: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
});

const Freelancer =
  mongoose.models.Freelancer || mongoose.model("Freelancer", freelancerSchema);

export default Freelancer;
