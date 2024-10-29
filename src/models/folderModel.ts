import mongoose, { Schema } from "mongoose";

const folderSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    files: {
      type: [String],
      default: [],
    },
    location: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Folder = mongoose.models.Folder || mongoose.model("Folder", folderSchema);

export default Folder;
