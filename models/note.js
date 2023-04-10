const mongoose = require("mongoose");

const AttachmentSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const ChecklistItemSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
    trim: true,
  },
  checked: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "#ffffff",
  },
  folder: {
    type: String,
    enum: ["inbox", "trash", "archive", "notes"],
    default: "inbox",
  },
  tags: {
    type: [String],
  },
  pinned: {
    type: Boolean,
    default: false,
  },
  trashed: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  modifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  modifiedAt: {
    type: Date,
    default: Date.now,
  },
  collaborators: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  permissions: {
    type: Map,
    of: String,
  },
  attachments: {
    type: [AttachmentSchema],
  },
  checklist: {
    type: [ChecklistItemSchema],
  },
});

const Note = mongoose.models.Note || mongoose.model("Note", NoteSchema);

export { NoteSchema, Note };
