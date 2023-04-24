import mongoose from "mongoose";

const agencyJobSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  details: {
    type: String,
    required: true,
    trim: true,
  },
  agencyId: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "inactive", "hold"],
    required: true,
  },
  salary: {
    type: Number,
    required: true,
    trim: true,
  },
  frequency: {
    type: String,
    required: true,
    trim: true,
  },
  hired_freelancer: {
    type: [
      {
        freelancer_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Freelancer",
        },
        hired_date: {
          type: Date,
        },
        duration: {
          type: String,
          default: "",
        },
        contact_person: {
          type: String,
          trim: true,
        },
        email: {
          type: String,
          trim: true,
        },
      },
    ],
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  job_type: {
    type: String,
    required: true,
    trim: true,
  },
  tags: {
    type: [String],
    trim: true,
  },
  applicants: {
    type: [
      {
        freelancer_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Freelancer",
        },
        status: {
          type: String,
          enum: ["pending", "hired", "rejected", "shortlisted"],
          default: "pending",
        },
        appliedDate: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
    default: [],
  },
  created_on: {
    type: Date,
  },
  updated_on: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const AgencyJob =
  mongoose.models.AgencyJob || mongoose.model("AgencyJob", agencyJobSchema);

export { agencyJobSchema, AgencyJob };
