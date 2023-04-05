import connectDB from "@/pages/api/db";
import User from "../../../../../../models/user";
// import { jobSchema, Job } from "../../../../../../models/job";

export default async function getJob(req, res) {
  const userId = req.query.id;
  const jobId = req.query.jobId;

  await connectDB();

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }

    const job = user.jobs.find((job) => job._id.toString() === jobId);
    if (!job) {
      return res.status(404).json({
        status: 404,
        message: "Job not found",
      });
    }

    res.status(200).json({
      status: 200,
      job,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
}
