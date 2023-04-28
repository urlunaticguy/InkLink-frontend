// API endpoint - /api/v1/user/{id}/jobs

//1. Post a job requirement by user
//2. Get all job requirement by user

import connectDB from "../../../db";
import User from "../../../../../models/user";
import { Job } from "../../../../../models/job";

connectDB();

export default async function postJob(req, res) {
  const { method } = req;

  const id = req.query.id;

  let user = await User.findById(id).select("-password");

  if (!user) {
    return res.status(404).json({
      status: 404,
      message: "User not found",
    });
  }

  switch (method) {
    case "POST":
      try {
        const {
          title,
          details,
          salary,
          frequency,
          location,
          type,
          tags,
          status,
        } = req.body;

        if (!user.jobs) {
          user.jobs = [];
        }

        let job = {
          title,
          details,
          salary,
          user: {
            name: user.name,
            _id: user._id,
            avatar: user.avatar,
          },
          frequency,
          location,
          type,
          tags,
          status,
          created_on: new Date(),
          updated_on: new Date(),
        };
        
        job = new Job(job);
        
        user.jobs.push({
          _id: job._id,
          posted_date: Date.now(),
        });

        await user.save();

        await job.save();

        res.status(200).json({
          status: 200,
          message: "success",
          data: "Posted job successfully",
        });
      } catch (e) {
        res.status(500).json({
          status: 500,
          message: "failure",
          data: e.message,
        });
      }
      return;

    case "GET":
      try {
        if (!user.jobs) {
          return res.status(404).json({
            status: 404,
            message: "no jobs found.",
          });
        }

        return res.status(200).json({
          status: 200,
          message: "success",
          data: user.jobs,
        });
      } catch (e) {
        res.status(500).json({
          status: 500,
          message: e.message,
        });
      }
      return;

    default:
      res.status(405).json({
        status: 405,
        message: "Method not allowed",
      });
      return;
  }
}
