//login a user with email and password
//with an api endpoint /api/v1/user/login

import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../../../models/user";
import connectDB from "../../db";


export default async function login(req, res) {
    await connectDB();
  
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({
          status: 400,
          message: "User with this email does not exist",
        });
      }
  
      if (!bcryptjs.compareSync(password, user.password)) {
        return res.status(400).json({
          status: 400,
          message: "Incorrect password",
        });
      }
  
      const token = jwt.sign({ id: user._id }, "passwordKey");
  
      res.json({
        token,
        status: 200,
        message: "success",
        data: { id: user._id },
      });
    } catch (e) {
      res.status(500).json({
        status: 500,
        message: e.message,
      });
    }
  }
  