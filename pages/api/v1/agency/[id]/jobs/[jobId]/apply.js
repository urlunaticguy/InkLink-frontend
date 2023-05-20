// 1. Apply for job --- POST
// 2. Check if user has already applied for the job  --- GET
//with an api endpoint of /api/v1/agency/{agencyId}/jobs/{jobID}/apply

import { Job } from "../../../../../../../models/job";
import Agency from "../../../../../../../models/agency";
import connectDB from "../../../../../db";

connectDB();
export default async function handler(req, res) {
  const { id, jobId } = req.query;
  const { method } = req;

  switch (method) {
    case "POST":
      const job = await Job.findById(jobId);

      if (!job) {
        return res.status(404).json({
          status: 404,
          message: "job not found",
        });
      }

      const agency = await Agency.findById(id);

      if (agency.role === "agency") {
        if (!job.applicants) {
          job.applicants = [];
        }

        if (
          await Job.findOne({ _id: jobId, "applicants.agency._id": id }).lean()
        ) {
          return res.status(400).json({
            status: 400,
            message: "You have already applied for this job",
          });
        }

        job.applicants.push({ 
          agency: {
          _id: agency._id,
          name: agency.name,
          avatar: agency.avatar,
        },
       });

        await job.save();

        agency.jobs_applied.push({
          _id: jobId,
        });
        await agency.save();

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

    case "GET":
      if (
        await Job.findOne({ _id: jobId, "applicants.agency._id": id }).lean()
      ) {
        return res.status(200).json({
          status: 200,
          message: "success",
          data: "true",
        });
      } else {
        return res.status(200).json({
          status: 200,
          message: "success",
          data: "false",
        });
      }

    default:
      return res.status(500).json({
        status: 500,
        message: `Server error - ${e.message}`,
      });
  }
}
