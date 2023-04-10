import connectDB from "@/pages/api/db";
import { Note } from "../../../../../models/note";
import Freelancer from "../../../../../models/freelancer";

connectDB();

export default async function handler(req, res) {
  const { title, content, color, folder, tags } = req.body;
  const freelancerId = req.query.id;

  try {
    const note = {
      title,
      content,
      color,
      folder,
      tags,
      createdBy: freelancerId,
      modifiedBy: freelancerId,
    };

    const freelancer = await Freelancer.findById(freelancerId);

    if(!freelancer){
        return res.status(404).send({
            status: 404,
            message: "freelancer not found",
        })
    }

    freelancer.notes.push(note);
    await freelancer.save();

    return res.status(200).json({
      status: 200,
      message: "success",
      data: note,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: "Error creating note",
    });
  }
}
