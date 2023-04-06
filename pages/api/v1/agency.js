import connectDb from "../db";
import Agency from "../../../models/agency";

connectDb();

export default async function getAgencies(req, res) {
  const { method } = req;

  let agencies = await  Agency.find();

  if(method === "GET"){
    return res.status(200).json({
        status: 200,
        message: "success",
        data: agencies
    });
  }else{
      return res.status(405).json({
        status: 405,
        message: "Method not allowed",
      });
    }
}
