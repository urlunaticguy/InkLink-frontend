// API endpoint - /api/v1/freelancer/{id}/schedule

//1. Post a schedule by a particular freelancer
//2. Get all schedules by a particular freelancer

import connectDb from "../../../db";
import Freelancer from "../../../../../models/freelancer";

connectDb();

export default async function addSchedule(req, res) {
  const { method } = req;
  const id = req.query.id;

  let freelancer;
  try {
    freelancer = await Freelancer.findById(id);
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }

  if (!freelancer) {
    return res.status(404).json({
      status: 404,
      message: "Freelancer not found",
    });
  }

  const { schedule: schedules } = freelancer;

  switch (method) {
    case "POST":
      try {
        const { name, start, end, duration, dependencies } = req.body;

        // Check that start time is before end time
        if (new Date(start) >= new Date(end)) {
          return res.status(400).json({
            status: 400,
            message: "Start time must be before end time",
          });
        }

        // Check for overlapping schedules
        const overlappingSchedule = schedules.find((schedule) => {
          const scheduleStart = new Date(schedule.start);
          const scheduleEnd = new Date(schedule.end);
          const newScheduleStart = new Date(start);
          const newScheduleEnd = new Date(end);

          return (
            (newScheduleStart >= scheduleStart &&
              newScheduleStart < scheduleEnd) ||
            (newScheduleEnd > scheduleStart && newScheduleEnd <= scheduleEnd) ||
            (scheduleStart >= newScheduleStart &&
              scheduleStart < newScheduleEnd) ||
            (scheduleEnd > newScheduleStart && scheduleEnd <= newScheduleEnd)
          );
        });

        if (overlappingSchedule) {
          return res.status(409).json({
            status: 409,
            message: "The new schedule clashes with an existing schedule.",
          });
        }

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

    case "GET":
      if (schedules.length === 0) {
        return res.status(404).json({
          status: 404,
          message: "No schedule found",
        });
      }

      try {
        res.status(200).json({
          status: 200,
          message: "Schedule retrieved successfully",
          data: schedules,
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
