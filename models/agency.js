import mongoose from 'mongoose';

const agencySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  avatar: {
    type: String,
    trim: true,
    default: ""
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
  tags: {
    type: [String],
    trim: true,
    default: []
  },
  freelancer_bookmarks: {
    type: [String],
    trim: true,
    default: []
  },
  client_bookmarks: {
    type: [String],
    trim: true,
    default: []
  },
  role: {
    type: String,
    default: "agency"
  },
  jobs_applied :{
    type: [{
      applied_date:{
        type: Date,
        default: Date.now,
      },
      _id:{
        type: String,
        ref: "Jobs",
      },
      hired:{
        type: Boolean,
        default: false,
      },
    }],
    ref: "AgencyJob",
    default: []
  },
  jobs_hired :{
    type: [{
      _id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Jobs",
      },
      hired_date:{
        type: Date,
        default: Date.now,
      },
      user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    }],
    default: []
  },
  jobs_posted :{
    type: [{
      posted_date:{
        type: Date,
        default: Date.now,
      },
      job_id:{
        type: String,
        ref: "Jobs",
      },
      hired:{
        type: Boolean,
        default: false,
      },
    }],
    ref: "AgencyJob",
    default: []
  }
});

const Agency = mongoose.models.Agency || mongoose.model('Agency', agencySchema);

export default Agency;


  // "dev": "nodemon --watch .env.local --exec 'next dev'"