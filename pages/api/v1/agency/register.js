import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import Agency from "../../../../models/agency";
import connectDB from "../../db";

export default async function register(req, res) {
  const { email, password, name, image } = req.body;

  try {
    await connectDB();
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    return res
      .status(500)
      .json({ status: 500, message: "Error connecting to database" });
  }

  const existingAgency = await Agency.findOne({ email });

  if (existingAgency) {
    return res
      .status(400) //Bad request ==> client error status code
      .json({ status: 400, message: "Agency with same email already exists!" });
  }

  const saltRounds = 10;

  if (!password || typeof password !== "string") {
    return res.status(400).json({ message: "Invalid password" });
  }

  const hashedPassword = await bcryptjs.hash(password, saltRounds);

  let agency = new Agency({
    email,
    password: hashedPassword,
    image,
    name,
  });

  agency = await agency.save();

  const token = jwt.sign({ id: agency._id }, "passwordKey");

  res.status(200).json({
    token,
    status: 200,
    message: "success",
    data: agency,
  });
}
