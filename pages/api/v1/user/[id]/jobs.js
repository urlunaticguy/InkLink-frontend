import connectDB from "@/pages/api/db";
import User from "../../../../../models/user";
import { jobSchema, Job } from "../../../../../models/job";

connectDB();

export default async function postJob(req, res) {
  const { method } = req;

  const { id } = req.query;

  let user = await User.findById(id);

  if (!user) {
    return res.status(404).json({
      status: 404,
      message: "User not found",
    });
  }

  switch (method) {
    case "POST":
      try {
        const { title, details, salary, frequency, location, type, tags, status } =
          req.body;
        if (!user.jobs) {
          user.jobs = [];
        }

        const job = {
          title,
          details,
          salary,
          frequency,
          location,
          type,
          tags,
          status,
          created_on: new Date(),
          updated_on: new Date(),
        };

        user.jobs.push(job);
        let savedJob = Job(job);
        savedJob = await savedJob.save();

        const savedUser = await user.save();

        res.status(200).json({
          status: 200,
          message: "success",
          data: savedUser,
        });
      } catch (e) {
        res.status(500).json({
          status: 500,
          message: e.message,
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
