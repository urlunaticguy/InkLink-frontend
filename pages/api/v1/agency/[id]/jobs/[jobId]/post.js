// API endpoint - /api/v1/agency/{id}/jobs/{jobId}/post

//1. Post a job requirement by agency if hired by a user

import connectDB from "../../../../../db";
import Agency from "../../../../../../../models/agency";
import { AgencyJob } from "@/models/agencyJob";

connectDB();

export default async function postJob(req, res) {
  const { method } = req;

  const { id, jobId } = req.query;

  let agency = await Agency.findById(id).select("-password");

  if (!agency) {
    return res.status(404).json({
      status: 404,
      message: "failure",
      data: "Agency not found",
    });
  }

  switch (method) {
    case "POST":
      //   try {
      const {
        title,
        details,
        salary,
        frequency,
        location,
        job_type,
        tags,
        status,
      } = req.body;

      if (!agency.jobs_posted) {
        agency.jobs_posted = [];
      }

      if (
        agency.jobs_hired.find(
          (job) => job._id.toString() === jobId.toString()
        ) 
      ) {
        try {
          let job = {
            title,
            details,
            salary,
            agency: {
              name: agency.name,
              _id: agency._id.toString(),
              avatar: agency.avatar,
            },
            frequency,
            location,
            job_type,
            tags,
            status,
            created_on: new Date(),
            updated_on: new Date(),
            applicants: [],
          };
          
          if (agency.jobs_posted.find(job => job.job_id.toString() === jobId.toString())) {
            return res.status(409).json({
              status: 409,
              message: "failure",
              data: "Job already posted",
            });
          }

          agency.jobs_posted.push({
            posted_date: Date.now(),
            job_id: jobId.toString(),
          });
          const savedAgency = await agency.save();

          job = new AgencyJob(job);

          job._id =
            savedAgency.jobs_posted[savedAgency.jobs_posted.length - 1]._id;

          await job.save();

          res.status(200).json({
            status: 200,
            message: "success",
            data: "Successfully posted the job",
          });
        } catch (e) {
          res.status(500).json({
            status: 500,
            message: "failure",
            data: e.message
          });
        }
        return;
      } else {
        res.status(401).json({
          status: 401,
          message: "failure",
          data: "Unauthorised access",
        });
        return;
      }

    // case "GET":
    //   try {
    //     if (!user.jobs) {
    //       return res.status(404).json({
    //         status: 404,
    //         message: "no jobs found.",
    //       });
    //     }

    //     return res.status(200).json({
    //       status: 200,
    //       message: "success",
    //       data: user.jobs,
    //     });
    //   } catch (e) {
    //     res.status(500).json({
    //       status: 500,
    //       message: e.message,
    //     });
    //   }
    //   return;

    default:
      res.status(405).json({
        status: 405,
        message: "failure",
        data: "Method not allowed",
      });
      return;
  }
}
