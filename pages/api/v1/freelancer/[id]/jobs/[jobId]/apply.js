//apply for a job posted by an agency
//Endpoint :- /api/v1/freelancer/{freelancerID}/jobs/{jobID}/apply

import { AgencyJob } from "../../../../../../../models/agencyJob";
import Agency from "../../../../../../../models/agency";
import connectDB from "../../../../../db";
import Freelancer from "../../../../../../../models/freelancer";

connectDB();
export default async function handler(req, res) {
  const {id, jobId } = req.query;

  const job = await AgencyJob.findById(jobId);

  const agency = await Agency.findById(job.agencyId);

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

      if (await AgencyJob.findOne({ _id: jobId, "applicants.freelancer_id": id })) {
        return res
          .status(400)
          .json({
            status: 400,
            message: "You have already applied for this job",
          });
      }

      job.applicants.push({freelancer_id: id});

      agency.jobs
        .find((job) => job._id.toString() === jobId)
        .applicants.push({agency_id: agency._id});

      await user.save();

      // // Save the updated job to the database
      await job.save();

      agency.jobs_applied.push(jobId);
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
  } catch (e) {
    return res.status(500).json({
      status: 500,
      message: `Server error - ${e.message}`,
    });
  }
}
