import connectDB from "@/pages/api/db";
import Agency from "@/models/agency";
import { AgencyJob } from "@/models/agencyJob";
import Freelancer from "@/models/freelancer";

connectDB();

export default async function hire(req, res) {
  const { method } = req;
  const{id, jobId } = req.query;
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

      let job = await AgencyJob.findById(jobId);

        const jobApplicants = job.applicants;

        for(var i = 0; i < jobApplicants.length; i++){
            if(jobApplicants[i].status != "hired"){
                jobApplicants[i].status = "rejected";
            }
        }

        job.updated_on = Date.now();

        job.status = "completed";

        job = await job.save();

        res.status(200).json({
          status: 200,
          message: "success",
          data: job,
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
