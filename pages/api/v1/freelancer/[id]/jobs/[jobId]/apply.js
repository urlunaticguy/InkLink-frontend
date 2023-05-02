//apply for a job posted by an agency
//Endpoint :- /api/v1/freelancer/{freelancerID}/jobs/{jobID}/apply

import { AgencyJob } from "../../../../../../../models/agencyJob";
import connectDB from "../../../../../db";
import Freelancer from "../../../../../../../models/freelancer";

connectDB();
export default async function handler(req, res) {
  const { id, jobId } = req.query;

  const job = await AgencyJob.findById(jobId);

  const freelancer = await Freelancer.findById(id);

  if (!job) {
    return res.status(404).json({
      status: 404,
      message: "Job not found",
    });
  }

  try {
    if (freelancer.role === "freelancer") {
      if (!job.applicants) {
        job.applicants = [];
      }

      if (
        await AgencyJob.findOne({
          _id: jobId,
          "applicants._id": id,
        }).lean()
      ) {
        return res.status(400).json({
          status: 400,
          message: "You have already applied for this job",
        });
      }

      job.applicants.push({
        _id: id,
        status: "pending",
        appliedDate: Date.now(),
      });

      await job.save();

      freelancer.jobs_applied.push({
        jobId,
        status: "pending",
        appliedDate: Date.now(),
      });

      await freelancer.save();

      return res.status(200).json({
        status: 200,
        message: "success",
        data: "Successfully applied for the job",
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
