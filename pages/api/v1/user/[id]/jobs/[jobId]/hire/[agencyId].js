import connectDB from "@/pages/api/db";
import User from "../../../../../../../../models/user";
import { Job } from "../../../../../../../../models/job";
import Agency from "@/models/agency";

connectDB();

export default async function jobFunc(req, res) {
  const { method } = req;
  const userId = req.query.id;
  const jobId = req.query.jobId;
  const agencyId = req.query.agencyId;
  const duration = req.body.duration;

  if (method === "PUT") {
    try {
      const user = await User.findById(userId);
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

      if (!job.hired_agency.agency_id) {
        if (
          !(await Job.findOne({ _id: jobId, "applicants.agency_id": agencyId }))
        ) {
          return res.status(400).json({
            status: 400,
            message: "Agency haven't applied for this job",
          });
        }

        job.hired_agency = {
            agency_id: agencyId,
            hired_date: Date.now(),
            contact_person: agency.name,
            email: agency.email,
            duration
        };

        user.jobs[jobIndex].hired_agency.agency_id = agencyId;

        const agencyIndex = job.applicants.findIndex(
          (agency) => agency.agency_id.toString() === agencyId
        );

        // console.log(agencyIndex);

        job.applicants[agencyIndex].status = "hired";

        // console.log(job.applicants[agencyIndex]);

        for (var i = 0; i < job.applicants.length; i++) {
          if (i != agencyIndex) {
            job.applicants[i].status = "rejected";
          }
        }

        job.updated_on = Date.now();

        job = await job.save();

        await user.save();

        res.status(200).json({
          status: 200,
          message: "success",
          data: job,
        });
      } else {
        res.status(409).json({
          status: 409,
          message: "conflict",
          data: "You have already hired an agency for this job.",
        });
      }
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
