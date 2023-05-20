//shortlist a freelancer for the job that is posted by the agency

import connectDB from "@/pages/api/db";
import Agency from "@/models/agency";
import { AgencyJob } from "@/models/agencyJob";
import Freelancer from "@/models/freelancer";

connectDB();

export default async function hire(req, res) {
  const { method } = req;
  const{id, jobId, freelancerId} = req.query;
  const duration = req.body.duration;

  if (method === "PUT") {
    try {
      const agency = await Agency.findById(id);
      if (!agency) {
        return res.status(404).json({
          status: 404,
          message: "agency not found",
        });
      }

      const jobIndex = agency.jobs_posted.findIndex(
        (job) => job._id.toString() === jobId
      );
      console.log(jobIndex);

      if (jobIndex === -1) {
        return res.status(404).json({
          status: 404,
          message: "job not found",
        });
      }

      const freelancer = await Freelancer.findById(freelancerId);
      if (!freelancer) {
        return res.status(404).json({
          status: 404,
          message: "freelancer not found",
        });
      }

      let job = await AgencyJob.findById(jobId);

        if (
          !(await AgencyJob.findOne({ _id: jobId, "applicants._id": freelancerId }))
        ) {
          return res.status(400).json({
            status: 400,
            message: "Freelancer haven't applied for this job",
          });
        }

        const freelancerIndex = job.applicants.findIndex(
            (freelancer) => freelancer._id.toString() === freelancerId
          );

        job.applicants[freelancerIndex].status = "shortlisted";

        job.updated_on = Date.now();

        job = await job.save();

        res.status(200).json({
          status: 200,
          message: "success",
          data: `Successfully shortlisted ${agency.name} for this job`,
        });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: 500,
        message: "Server error",
      });
    }
  } else {
    return res.status(405).json({
      status: 405,
      message: "Method not allowed",
    });
  }
}
