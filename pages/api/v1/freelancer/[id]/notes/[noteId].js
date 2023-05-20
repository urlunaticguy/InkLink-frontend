//delete a note

import Freelancer from "@/models/freelancer";
import { Note } from "@/models/note";
import connectDB from "@/pages/api/db";

connectDB();

export default async function addCollaborator(req, res) {
  const { method } = req;
  const { id, noteId } = req.query;

  const freelancer = await Freelancer.findById(id).lean();

  const note = await Note.findById(noteId).lean();

  if (note.createdBy.toString() !== id) {
    return res.status(401).json({
      status: 401,
      message: "failure",
      data: "Unauthorised access",
    });
  }

  switch (method) {
    case "DELETE":
      try {
        const noteIndex = freelancer.notes.indexOf(noteId);

        if (noteIndex !== -1) {
          freelancer.notes.splice(noteIndex, 1);

          await Note.findByIdAndDelete(noteId); // Delete the note from the database

          await Freelancer.findByIdAndUpdate(id, { notes: freelancer.notes }); // Update the freelancer's notes array

          return res.status(200).json({
            status: 200,
            message: "success",
            data: "Note deleted successfully",
          });
        }

        return res.status(200).json({
          status: 200,
          message: "success",
          data: "Note not found",
        });
      } catch (e) {
        return res.status(400).json({
          status: 400,
          message: "failure",
          data: e,
        });
      }
    default:
      return res.status(405).json({
        status: 405,
        message: "failure",
        data: "Method not allowed",
      });
  }
}
