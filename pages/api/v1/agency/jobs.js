//get all jobs listed by the clients and are active
//with api endpoint /api/v1/agency/jobs

import connectDB from "../../db";
import {Job} from "../../../../models/job";

connectDB();


export default async function handler(
  req, res
) {
  if (req.method === "GET") {
    try {

      const { limit, skip } = req.query;

      const jobs = await Job.find({ status: "active" })
        .select("-applicants")
        .skip(parseInt(skip))
        .limit(parseInt(limit));
        
      const totalJobs = await Job.countDocuments({ status: "active" });

      return res.status(200).json({
        status: 200,
        message: "success",
        data: jobs,
        total: totalJobs,
        limit: parseInt(limit),
        skip: parseInt(skip),
      });
    } catch (e) {
      res.status(500).json({
        status: 500,
        message: e.message,
      });
    }
  }
}
