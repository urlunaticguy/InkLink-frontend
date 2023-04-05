import bcryptjs from "bcryptjs";
import User from "../../../../models/user";
import connectDB from "../../db";
import jwt from "jsonwebtoken";

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

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res
      .status(400) //Bad request ==> client error status code
      .json({ status: 400, message: "User with same email already exists!" });
    //this will return the status code as 400 and the message
  }
  //200 - OK

  const saltRounds = 10;

  if (!password || typeof password !== "string") {
    return res.status(400).json({ message: "Invalid password" });
  }

  const hashedPassword = await bcryptjs.hash(password, saltRounds);

  let user = new User({
    email,
    password: hashedPassword,
    image,
    name,
  });

  user = await user.save();

  const token = jwt.sign({ id: user._id }, "passwordKey");

  res.status(200).json({
    token,
    status: 200,
    message: "success",
    data: agency,
  });
}
