// import connectDB from "@/pages/api/db";
// import User from "../../../../../../models/user";
// // import { jobSchema, Job } from "../../../../../../models/job";

// connectDB();

// export default async function jobFunc(req, res) {

//   const { method } = req;

//   const userId = req.query.id;
//   const jobId = req.query.jobId;

//   const user = await User.findById(userId);
//   if (!user) {
//     return res.status(404).json({
//       status: 404,
//       message: "user not found",
//     });
//   }

//   const job = user.jobs.find((job) => job._id.toString() === jobId);
//   if (!job) {
//     return res.status(404).json({
//       status: 404,
//       message: "job not found",
//     });
//   }

//   switch (method) {
//     case "GET":
//       try {
//         res.status(200).json({
//           status: 200,
//           message: "success",
//           job,
//         });
//       } catch (error) {
//         console.error(error);
//         res.status(500).json({
//           status: 500,
//           message: "Server error",
//         });
//       }
//       break;

//     case "DELETE":
//       try {
//         const jobIndex = user.jobs.findIndex(
//           (job) => job._id.toString() === jobId
//         );

//         if (jobIndex === -1) {
//           return res.status(404).json({
//             status: 404,
//             message: "job not found",
//           });
//         }

//         user.jobs.splice(jobIndex, 1);

//         const updatedUser = await user.save();

//         res.status(200).json({
//           status: 200,
//           message: "job deleted successfully",
//           data: updatedUser,
//         });
//       } catch (error) {
//         console.error(error);
//         res.status(500).json({
//           status: 500,
//           message: "Server error",
//         });
//       }
//       break;

//     case "PUT":
//       try {
//         const {
//           title,
//           details,
//           salary,
//           frequency,
//           location,
//           type,
//           tags,
//           status,
//         } = req.body;

//         let jobs = user.jobs;

//         if (!jobs) {
//           return res.status(404).json({
//             status: 404,
//             message: "no jobs found",
//           });
//         }

//         const jobIndex = user.jobs.findIndex(
//           (job) => job._id.toString() === jobId
//         );

//         if (jobIndex === -1) {
//           return res.status(404).json({
//             status: 404,
//             message: "job not found",
//           });
//         }

//         jobs[jobIndex].title = title;
//         jobs[jobIndex].details = details;
//         jobs[jobIndex].salary = salary;
//         jobs[jobIndex].frequency = frequency;
//         jobs[jobIndex].location = location;
//         jobs[jobIndex].type = type;
//         jobs[jobIndex].tags = tags;
//         jobs[jobIndex].status = status;
//         jobs[jobIndex].updated_on = new Date();


//         user.jobs = jobs;

//         const updatedUser = await user.save();

//         res.status(200).json({
//           status: 200,
//           message: "job updated successfully",
//           data: updatedUser,
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


import connectDB from "@/pages/api/db";
import User from "../../../../../../models/user";

connectDB();

export default async function jobFunc(req, res) {
  const { method } = req;
  const userId = req.query.id;
  const jobId = req.query.jobId;

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

    const job = user.jobs[jobIndex];

    switch (method) {
      case "GET":
        res.status(200).json({
          status: 200,
          message: "success",
          job,
        });
        return;

      case "DELETE":

      const deletedJob = user.jobs[jobIndex];
        user.jobs.splice(jobIndex, 1);
        await user.save();
        res.status(200).json({
          status: 200,
          message: "job deleted successfully",
          data: deletedJob,
        });
        return;

      case "PUT":
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

        const jobIndex = user.jobs.findIndex(
          (job) => job._id.toString() === jobId
        );

        if (jobIndex === -1) {
          return res.status(404).json({
            status: 404,
            message: "job not found",
          });
        }

        user.jobs[jobIndex].title = title;
        user.jobs[jobIndex].details = details;
        user.jobs[jobIndex].salary = salary;
        user.jobs[jobIndex].frequency = frequency;
        user.jobs[jobIndex].location = location;
        user.jobs[jobIndex].type = type;
        user.jobs[jobIndex].tags = tags;
        user.jobs[jobIndex].status = status;
        user.jobs[jobIndex].updated_on = new Date();

        let updatedUser = await user.save();

        res.status(200).json({
          status: 200,
          message: "job updated successfully",
          data: user.jobs[jobIndex],
        });
        return;

      default:
        res.status(405).json({
          status: 405,
          message: "Method not allowed",
        });
        return;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
}
