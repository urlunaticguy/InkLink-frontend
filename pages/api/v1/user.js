import connectDb from "../db";
import User from "../../../models/user";

connectDb();

export default async function getUsers(req, res) {
  const { method } = req;

  let users = await  User.find();

  if(method === "GET"){
    return res.status(200).json({
        status: 200,
        message: "success",
        data: users
    });
  }else{
      return res.status(405).json({
        status: 405,
        message: "Method not allowed",
      });
    }
}
