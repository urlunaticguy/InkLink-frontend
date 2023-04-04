import mongoose from "mongoose";
import jobSchema from "./job";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
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
  jobs: [{
    job: {
      type: jobSchema, // reference the jobSchema
      required: true,
    },
    applicants:{
      type: [String],
      default: []
    },
    created_on: {
      type: Date,
      required: true,
      default: Date.now,
    },
    updated_on: {
      type: Date,
      required: true,
      default: Date.now,
    },
  }],
  tags: {
    type: [String],
    trim: true,
  },
  bookmarks: {
    type: [String],
    trim: true,
  }
});


const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
