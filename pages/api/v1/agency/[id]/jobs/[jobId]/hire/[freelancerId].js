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

      if (job.status !== "active") {
        return res.status(401).json({
          status: 401,
          message: "Unauthorised Access",
        });
      }

        if (
          !(await AgencyJob.findOne({ _id: jobId, "applicants._id": freelancerId }))
        ) {
          return res.status(400).json({
            status: 400,
            message: "Freelancer haven't applied for this job",
          });
        }

        job.hired_freelancers.push( {
            _id: freelancerId,
            hired_date: Date.now(),
            contact_person: freelancer.name,
            email: freelancer.email,
            duration,
        });

        // user.jobs[jobIndex].hired_agency.agency_id = agencyId;

        const freelancerIndex = job.applicants.findIndex(
          (freelancer) => freelancer._id.toString() === freelancerId
        );

        // console.log(agencyIndex);

        job.applicants[freelancerIndex].status = "hired";

        // console.log(job.applicants[agencyIndex]);

        if(!freelancer.jobs_hired){
            freelancer.jobs_hired = [];
        }

        freelancer.jobs_hired.push({
            job_id: jobId,
            hired_date: Date.now(),
            agency_id: id
        });

        job.updated_on = Date.now();

        job = await job.save();

        await freelancer.save();

        res.status(200).json({
          status: 200,
          message: "success",
          data: `Successfully hired ${agency.name} for this job`,
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
