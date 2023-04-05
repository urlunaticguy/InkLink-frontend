import connectDB from "@/pages/api/db";
import User from "@/models/user";
import {jobSchema, Job} from "@/models/job";

export default async function postJob(req, res) {
  await connectDB();
  try {
    const { title, details, salary, frequency, location, type, tags } =
      req.body;
    const { id } = req.query;

    let user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }

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
        status: 'active',
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
}
