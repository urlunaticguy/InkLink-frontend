import Freelancer from "../../../../models/freelancer";
import connectDB from "../../db";
import mongoose from "mongoose";

connectDB();

export default async function handler(req, res) {
  const { id } = req.query;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ status: 400, message: "Invalid user ID" });
  }

  try {

    const freelancer = await Freelancer.findById(id);

    if (!freelancer) {
      return res.status(404).json({
        status: 404,
        message: "Freelancer not found",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "success",
      data: freelancer,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
}
