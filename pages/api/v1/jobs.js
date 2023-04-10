//Apply for job

import { Job } from "../../../models/job";
import Agency from "../../../models/agency";
import User from "../../../models/user";
import connectDB from "../db";

connectDB();
export default async function handler(req, res) {
  // const router = useRouter();
  const { userId, agencyId, jobId } = req.query;

  const job = await Job.findById(jobId);

  const user = await User.findById(userId);

  if (!job) {
    return res.status(404).json({
      status: 404,
      message: "job not found",
    });
  }

  try {
    const agency = await Agency.findById(agencyId);

    if (agency.role === "agency") {
      if (!job.applicants) {
        job.applicants = [];
      }

      if (job.applicants.includes(agency._id)) {
        return res
          .status(400)
          .json({
            status: 400,
            message: "You have already applied for this job",
          });
      }

      job.applicants.push(agency._id);

      user.jobs
        .find((job) => job._id.toString() === jobId)
        .applicants.push(agency._id);

      await user.save();

      // // Save the updated job to the database
      await job.save();

      agency.jobs_applied.push(jobId);
      await agency.save();

      return res.status(200).json({
        status: 200,
        message: "success",
        data: job,
      });
    } else {
      return res.status(401).json({
        status: 401,
        message: "Unauthorised Access",
      });
    }
  } catch (e) {
    return res.status(500).json({
      status: 500,
      message: `Server error - ${e.message}`,
    });
  }
}
