//add a note 

import connectDB from "@/pages/api/db";
import { Note } from "../../../../../models/note";
import Freelancer from "../../../../../models/freelancer";

connectDB();

export default async function handler(req, res) {
  const { title, content, color, folder, tags } = req.body;
  const freelancerId = req.query.id;

  try {
    let note = {
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

    note = await new Note(note).save();

    freelancer.notes.push(note._id.toString());

    await freelancer.save();

    return res.status(201).json({
      status: 201,
      message: "success",
      data: 'Succesfully created a note',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: "Error creating note",
    });
  }
}
