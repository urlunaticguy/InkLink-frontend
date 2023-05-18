import Freelancer from "@/models/freelancer";
import { Note } from "@/models/note";
import connectDB from "@/pages/api/db";

connectDB();

export default async function addCollaborator(req, res) {
  const { method } = req;
  const { id, noteId, freelancerId } = req.query;

  const note = await Note.findById(noteId);

  const otherFreelancer = await Freelancer.findById(freelancerId);

  if (!otherFreelancer) {
    return res.status(404).json({
      status: 404,
      message: "success",
      status: "Freelancer not found",
    });
  }
  
  if (note.createdBy.toString() !== id) {
    return res.status(401).json({
      status: 401,
      message: "failure",
      data: "Unauthorised access",
    });
  }

  switch (method) {
    case "PUT":
      try {
        if (note.collaborators.some((collab) => collab._id.toString() === freelancerId)) {
          return res.status(400).json({
            status: 400,
            message: "You have already applied for this job",
            data: null,
          });
        }
    
        note.collaborators.push({
          _id: otherFreelancer._id,
          name: otherFreelancer.name,
          avatar: otherFreelancer.avatar,
        });
    
        await note.save();
    
        return res.status(200).json({
          status: 200,
          message: "success",
          data: "Freelancer added as a collaborator",
        });
      } catch (e) {
        return res.status(400).json({
          status: 400,
          message: "failure",
          data: e,
        });
      }

    case "DELETE":
      try {
        const collaboratorIndex = note.collaborators.findIndex(
          (collaborator) => collaborator._id.toString() === freelancerId
        );
    
        if (collaboratorIndex !== -1) {
          note.collaborators.splice(collaboratorIndex, 1);
          await note.save();
          return res.status(200).json({
            status: 200,
            message: "success",
            data: "Freelancer removed as a collaborator",
          });
        } else {
          return res.status(400).json({
            status: 400,
            message: "failure",
            data: "Collaborator not found",
          });
        }
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
