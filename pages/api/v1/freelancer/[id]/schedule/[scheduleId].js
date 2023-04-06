import connectDb from "../../../../db";
import Freelancer from "../../../../../../models/freelancer";

// connectDb();

// export default async function updateSchedule(req, res) {
//   const { method } = req;
//   const id = req.query.id;
//   const scheduleId = req.query.scheduleId;

//   switch (method) {
//     case "PUT":
//       try {
//         const freelancer = await Freelancer.findById(id);

//         if (!freelancer) {
//           return res.status(404).json({
//             status: 404,
//             message: "Freelancer not found",
//           });
//         }

//         const { name, start, end, duration, dependencies } = req.body;

//         //start time should be less than end time
//         if (start >= end) {
//           return res.status(400).json({
//             status: 400,
//             message: "Start time must be before end time.",
//           });
//         }

//         // Check for overlapping schedules
//         const schedules = freelancer.schedule;
//         const overlappingSchedule = schedules.find((schedule) => {
//           if (schedule._id.toString() === scheduleId) {
//             return false;
//           }

//           const scheduleStart = new Date(schedule.start);
//           const scheduleEnd = new Date(schedule.end);
//           const newScheduleStart = new Date(start);
//           const newScheduleEnd = new Date(end);

//           return (
//             (newScheduleStart >= scheduleStart &&
//               newScheduleStart < scheduleEnd) ||
//             (newScheduleEnd > scheduleStart && newScheduleEnd <= scheduleEnd) ||
//             (scheduleStart >= newScheduleStart &&
//               scheduleStart < newScheduleEnd) ||
//             (scheduleEnd > newScheduleStart && scheduleEnd <= newScheduleEnd)
//           );
//         });

//         if (overlappingSchedule) {
//           return res.status(409).json({
//             status: 409,
//             message: "The new schedule clashes with an existing schedule.",
//           });
//         }

//         const scheduleIndex = schedules.findIndex(
//           (schedule) => schedule._id.toString() === scheduleId
//         );

//         if (scheduleIndex === -1) {
//           return res.status(404).json({
//             status: 404,
//             message: "Schedule not found",
//           });
//         }

//         schedules[scheduleIndex].name = name;
//         schedules[scheduleIndex].start = start;
//         schedules[scheduleIndex].end = end;
//         schedules[scheduleIndex].duration = duration;
//         schedules[scheduleIndex].dependencies = dependencies;

//         freelancer.schedule = schedules;

//         const updatedFreelancer = await freelancer.save();

//         res.status(200).json({
//           status: 200,
//           message: "Schedule updated successfully",
//           data: updatedFreelancer,
//         });
//       } catch (error) {
//         res.status(500).json({
//           status: 500,
//           message: error.message,
//         });
//       }
//       break;

//     case "DELETE":
//       try {
//         const freelancer = await Freelancer.findById(id);

//         if (!freelancer) {
//           return res.status(404).json({
//             status: 404,
//             message: "Freelancer not found",
//           });
//         }

//         const scheduleId = req.query.scheduleId;

//         const scheduleIndex = freelancer.schedule.findIndex(
//           (schedule) => schedule._id.toString() === scheduleId
//         );

//         if (scheduleIndex === -1) {
//           return res.status(404).json({
//             status: 404,
//             message: "Schedule not found",
//           });
//         }

//         freelancer.schedule.splice(scheduleIndex, 1);

//         const updatedFreelancer = await freelancer.save();

//         res.status(200).json({
//           status: 200,
//           message: "Schedule deleted successfully",
//           data: updatedFreelancer,
//         });
//       } catch (error) {
//         res.status(500).json({
//           status: 500,
//           message: error.message,
//         });
//       }
//       break;

//     default:
//       res.status(405).json({
//         status: 405,
//         message: "Method not allowed",
//       });
//       break;
//   }
// }

connectDb();

export default async function updateSchedule(req, res) {
  const { method } = req;
  const id = req.query.id;
  const scheduleId = req.query.scheduleId;

try{
  const freelancer = await Freelancer.findById(id);

  if (!freelancer) {
    return res.status(404).json({
      status: 404,
      message: "Freelancer not found",
    });
  }

  const scheduleIndex = freelancer.schedule.findIndex(
    (schedule) => schedule._id.toString() === scheduleId
  );

  if (scheduleIndex === -1) {
    return res.status(404).json({
      status: 404,
      message: "Schedule not found",
    });
  }

  const schedule = freelancer.schedule[scheduleIndex];

  switch (method) {
    case "PUT":

        const { name, start, end, duration, dependencies } = req.body;

        // start time should be less than end time
        if (start >= end) {
          return res.status(400).json({
            status: 400,
            message: "Start time must be before end time.",
          });
        }

        // check for overlapping schedules
        const overlappingSchedule = freelancer.schedule.find(
          (schedule) =>
            schedule._id.toString() !== scheduleId &&
            new Date(schedule.start) < new Date(end) &&
            new Date(schedule.end) > new Date(start)
        );

        if (overlappingSchedule) {
          return res.status(409).json({
            status: 409,
            message: "The new schedule clashes with an existing schedule.",
          });
        }

        schedule.name = name;
        schedule.start = start;
        schedule.end = end;
        schedule.duration = duration;
        schedule.dependencies = dependencies;

        await freelancer.save();

         res.status(200).json({
          status: 200,
          message: "Schedule updated successfully",
          data: schedule,
        });
      return;

    case "DELETE":

        const deletedSchedule = schedule;

        freelancer.schedule.splice(scheduleIndex, 1);

        await freelancer.save();

        res.status(200).json({
          status: 200,
          message: "Schedule deleted successfully",
          data: deletedSchedule,
        });
      return;

      case "GET":
        // freelancer.schedule.splice(scheduleIndex, 1);

        // const updatedFreelancer = await freelancer.save();

        res.status(200).json({
          status: 200,
          message: "Schedule deleted successfully",
          data: schedule,
        });
      return;

    default:
      res.status(405).json({
        status: 405,
        message: "Method not allowed",
      });
      break;
  }
}catch (error) {
  res.status(500).json({
    status: 500,
    message: error.message,
  });
}
}

