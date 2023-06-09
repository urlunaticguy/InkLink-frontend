//get all the freelancers with a query params limit and skip
//with an api endpoint /api/v1/freelancer?limit=2&skip=0

import connectDb from "../db";
import Freelancer from "../../../models/freelancer";

connectDb();

export default async function getFreelancers(req, res) {
  const { method, query } = req;

  if (method !== "GET") {
    return res.status(405).json({
      status: 405,
      message: "Method not allowed",
    });
  }

  const { skip, limit } = query;

  try {
    const freelancers = await Freelancer.find()
      .select("-password -bookmarks")
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .lean(); // add .lean() to improve performance by returning plain JavaScript objects instead of Mongoose documents

    const totalFreelancers = await Freelancer.countDocuments();

    return res.status(200).json({
      status: 200,
      message: "success",
      data: freelancers,
      total: totalFreelancers,
      limit: parseInt(limit),
      skip: parseInt(skip),
    });
  } catch (e) {
    res.status(500).json({
      status: 500,
      message: e.message,
    });
  }
}
