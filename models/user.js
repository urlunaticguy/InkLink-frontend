import mongoose from "mongoose";

const userSchema = mongoose.Schema({
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
  jobs: {
    type: [{
      posted_date: Date,
      _id: mongoose.Schema.Types.ObjectId,
      hired:{
        type: Boolean,
        default: false,
      },
    }],
    ref: "Job",
    default: []
  },
  tags: {
    type: [String],
    trim: true,
    default: []
  },
  bookmarks: {
    type: [String],
    trim: true,
    default: []
  },
  role: {
    type: String,
    default: "user"
  },
});


const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
