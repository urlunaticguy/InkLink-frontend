import connectDB from "@/pages/api/db";
import User from "../../../../../../../../models/user";
import { Job } from "../../../../../../../../models/job";
import Agency from "@/models/agency";

connectDB();

export default async function jobFunc(req, res) {
  const { method } = req;
  const { id, jobId, agencyId } = req.query;

  if (method === "PUT") {
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({
          status: 404,
          message: "user not found",
        });
      }

      const jobIndex = user.jobs.findIndex(
        (job) => job._id.toString() === jobId
      );

      if (jobIndex === -1) {
        return res.status(404).json({
          status: 404,
          message: "job not found",
        });
      }

      const agency = await Agency.findById(agencyId);
      if (!agency) {
        return res.status(404).json({
          status: 404,
          message: "agency not found",
        });
      }

      let job = await Job.findById(jobId);

      if (
        !(await Job.findOne({
          _id: jobId,
          "applicants.agency._id": agencyId,
        }))
      ) {
        return res.status(400).json({
          status: 400,
          message: "Agency haven't applied for this job",
        });
      }

      const agencyIndex = job.applicants.findIndex(
        (agencies) => agencies.agency._id.toString() === agencyId
      );

      job.applicants[agencyIndex].status = "rejected";

      if (job.hired_agency.agency && job.hired_agency.agency._id.toString() === agencyId) {
        job.hired_agency = {};

        const jobHiredIndex = agency.jobs_hired.findIndex(
          (job) => job._id.toString() === jobId
        );

        if (jobHiredIndex !== -1) {
          agency.jobs_hired.splice(jobHiredIndex, 1);
        }
      }

      job.updated_on = Date.now();

      await job.save();
      
      await agency.save();

      res.status(200).json({
        status: 200,
        message: "success",
        data: `Successfully rejected ${agency.name} for the job`,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: 500,
        message: "failure",
        data: "Server error",
      });
    }
  } else {
    return res.status(405).json({
      status: 405,
      message: "failure",
      data: "Method not allowed",
    });
  }
}
