import mongoose from "mongoose";

const freelancerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
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
});


const Freelancer = mongoose.models.Freelancer || mongoose.model("Freelancer", freelancerSchema);

export default Freelancer;