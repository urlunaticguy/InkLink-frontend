import mongoose from "mongoose";

const jobSchema = mongoose.Schema({
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
  user:{
    type: {
      name: {
        type: String,
        required: true,
      },
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      avatar: {
        type: String,
      },
    },
    ref: "User",
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'hold'],
    required: true
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
  hired_agency:{
    agency_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agency"
    },
    hired_date: {
      type: Date,
    },
    duration: {
      type: String,
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
  location: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    trim: true,
  },
  tags: {
    type: [String],
    trim: true,
  },
  applicants:{
    type: [{
      agency_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Agency",
      },
      status: {
        type: String,
        enum: ["pending", "hired", "rejected"],
        default: "pending",
      },
      appliedDate: {
        type: Date,
        default: Date.now(),
      },
    }],
    default: []
  },
  created_on: {
    type: Date,
  },
  updated_on: {
    type: Date,
    required: true,
    default: Date.now,
  }
});


const Job = mongoose.models.Job || mongoose.model("Job", jobSchema);

export { jobSchema, Job };
