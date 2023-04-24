//get all the users with a query params limit and skip
//with an api endpoint /api/v1/user?limit=2&skip=0

import connectDb from "../db";
import User from "../../../models/user";

connectDb();

export default async function getUsers(req, res) {
  const { method, query } = req;

  if (method !== "GET") {
    return res.status(405).json({
      status: 405,
      message: "Method not allowed",
    });
  }

  const { skip, limit } = query;

  try {
    const users = await User.find()
      .select("-password -bookmarks") // exclude the password field from the response
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .lean(); // add .lean() to improve performance by returning plain JavaScript objects instead of Mongoose documents

    const totalUsers = await User.countDocuments();

    return res.status(200).json({
      status: 200,
      message: "success",
      data: users,
      total: totalUsers,
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
