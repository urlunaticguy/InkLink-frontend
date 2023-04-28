import connectDB from "@/pages/api/db";
import User from "../../../../../../../../models/user";
import { Job } from "../../../../../../../../models/job";
import Agency from "@/models/agency";
import { isUndefined } from "swr/_internal";

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

      // console.log(job.hired_agency.agency === undefined);

      if (job.hired_agency.agency === undefined) {
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

        job.hired_agency = {
          agency: {
            _id: agencyId,
            name: agency.name,
            email: agency.email,
            avatar: agency.avatar,
          },
          hired_date: Date.now(),
          duration,
        };

        // user.jobs[jobIndex].hired_agency.agency_id = agencyId;

        const agencyIndex = job.applicants.findIndex(
          (agency) => agency.agency._id.toString() === agencyId
        );

        // console.log(agencyIndex);

        job.applicants[agencyIndex].status = "hired";

        // console.log(job.applicants[agencyIndex]);

        for (var i = 0; i < job.applicants.length; i++) {
          if (i != agencyIndex) {
            job.applicants[i].status = "rejected";
          }
        }

        agency.jobs_hired.push({
          _id: jobId,
          hired_date: Date.now(),
          user_id: userId,
        });

        job.updated_on = Date.now();
        job.status = "completed";

        await job.save();

        await user.save();

        await agency.save();

        res.status(200).json({
          status: 200,
          message: "success",
          data: `Succesfully hired ${agency.name} for the job`,
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
