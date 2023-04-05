import connectDb from "../../../db";
import Freelancer from "../../../../../models/freelancer";

connectDb();

export default async function addSchedule(req, res) {
  const { method } = req;
  const id = req.query.id;

  switch (method) {
    case "POST":
      try {
        const freelancer = await Freelancer.findById(id);

        if (!freelancer) {
          return res.status(404).json({
            status: 404,
            message: "Freelancer not found",
          });
        }

        const { name, start, end, duration, dependencies } = req.body;

        const newSchedule = {
          name,
          start,
          end,
          duration,
          dependencies,
        };

        freelancer.schedule.push(newSchedule);

        const updatedFreelancer = await freelancer.save();

        res.status(200).json({
          status: 200,
          message: "Schedule added successfully",
          data: updatedFreelancer,
        });
      } catch (error) {
        res.status(500).json({
          status: 500,
          message: error.message,
        });
      }
      break;
    default:
      res.status(405).json({
        status: 405,
        message: "Method not allowed",
      });
      break;
  }
}
