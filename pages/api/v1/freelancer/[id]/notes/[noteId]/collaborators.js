//get all the collaborators of a specific note

import { Note } from "@/models/note";
import connectDB from "@/pages/api/db";

connectDB();

export default async function addCollaborator(req, res) {
  const { method } = req;
  const { id, noteId } = req.query;

  const note = await Note.findById(noteId).lean();

  if (note.createdBy.toString() !== id) {
    return res.status(401).json({
      status: 401,
      message: "failure",
      data: "Unauthorised access",
    });
  }

  switch (method) {
    case "GET":
      try {
        return res.status(200).json({
          status: 200,
          message: "success",
          data: note.collaborators,
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
