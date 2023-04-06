import connectDb from "../db";
import Freelancer from "../../../models/freelancer";

connectDb();

export default async function getFreelancers(req, res) {
  const { method } = req;

  let freelancers = await  Freelancer.find();

  if(method === "GET"){
    return res.status(200).json({
        status: 200,
        message: "success",
        data: freelancers
    });
  }else{
      return res.status(405).json({
        status: 405,
        message: "Method not allowed",
      });
    }
}
