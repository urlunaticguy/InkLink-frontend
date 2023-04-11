//login an agency with email and password
//with an api endpoint /api/v1/agency/login

import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import Agency from "../../../../models/agency";
import connectDB from "../../db";

export default async function login(req, res) {
  await connectDB();

  try {
    const { email, password } = req.body;

    const agency = await Agency.findOne({ email });

    if (!agency) {
      return res.status(400).json({
        status: 400,
        message: "Agency with this email does not exist",
      });
    }

    if (!bcryptjs.compareSync(password, agency.password)) {
      return res.status(400).json({
        status: 400,
        message: "Incorrect password",
      });
    }

    const token = jwt.sign({ id: agency._id }, "passwordKey");

    res.json({
      token,
      status: 200,
      message: "success",
      data: { id: agency._id },
    });
  } catch (e) {
    res.status(500).json({
      status: 500,
      message: e.message,
    });
  }
}
