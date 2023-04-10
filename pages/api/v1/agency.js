// import connectDb from "../db";
// import Agency from "../../../models/agency";

// connectDb();

// export default async function getAgencies(req, res) {
//   const { method } = req;

//   let agencies = await  Agency.find();

//   if(method === "GET"){
//     return res.status(200).json({
//         status: 200,
//         message: "success",
//         data: agencies
//     });
//   }else{
//       return res.status(405).json({
//         status: 405,
//         message: "Method not allowed",
//       });
//     }
// }
import connectDb from "../db";
import Agency from "../../../models/agency";

connectDb();

export default async function getAgencies(req, res) {
  const { method, query } = req;

  if (method !== "GET") {
    return res.status(405).json({
      status: 405,
      message: "Method not allowed",
    });
  }

  const { skip, limit } = query;

  try {
    const agencies = await Agency.find()
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .lean(); // add .lean() to improve performance by returning plain JavaScript objects instead of Mongoose documents

    const totalAgencies = await Agency.countDocuments();

    return res.status(200).json({
      status: 200,
      message: "success",
      data: agencies,
      total: totalAgencies,
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
