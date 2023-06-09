//register a freelancer with name, email, avatar and password
//with an api endpoint of /api/v1/freelancer/register

import bcryptjs from "bcryptjs";
import Freelancer from "../../../../models/freelancer";
import connectDB from "../../db";
import jwt from "jsonwebtoken";

export default async function register(req, res) {
  const { email, password, name, avatar } = req.body;

  try {
    await connectDB();
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    return res
      .status(500)
      .json({ status: 500, message: "Error connecting to database" });
  }

  const existingFreelancer = await Freelancer.findOne({ email });

  if (existingFreelancer) {
    return res
      .status(400) //Bad request ==> client error status code
      .json({
        status: 400,
        message: "Freelancer with same email already exists!",
      });
    //this will return the status code as 400 and the message
  }
  //200 - OK

  const saltRounds = 10;

  if (!password || typeof password !== "string") {
    return res.status(400).json({ message: "Invalid password" });
  }

  const hashedPassword = await bcryptjs.hash(password, saltRounds);

  let freelancer = new Freelancer({
    email,
    password: hashedPassword,
    avatar,
    name,
  });

  freelancer = await freelancer.save();

  const token = jwt.sign({ id: freelancer._id }, "passwordKey");

  res.status(200).json({
    token,
    status: 200,
    message: "success",
    data: freelancer,
  });
}
