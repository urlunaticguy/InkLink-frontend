//login a freelancer with email and password
//with an api endpoint /api/v1/freelancer/login

import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from "../../db";
import Freelancer from "../../../../models/freelancer";


export default async function login(req, res) {
    await connectDB();
  
    try {
      const { email, password } = req.body;
  
      const freelancer = await Freelancer.findOne({ email });
  
      if (!freelancer) {
        return res.status(400).json({
          status: 400,
          message: "Freelancer with this email does not exist",
        });
      }
  
      if (!bcryptjs.compareSync(password, freelancer.password)) {
        return res.status(400).json({
          status: 400,
          message: "Incorrect password",
        });
      }
  
      const token = jwt.sign({ id: freelancer._id }, "passwordKey");
  
      res.json({
        token,
        status: 200,
        message: "success",
        data: { id: freelancer._id },
      });
    } catch (e) {
      res.status(500).json({
        status: 500,
        message: e.message,
      });
    }
  }
  