import mongoose from "mongoose";

const folderSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      // unique: true,
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

const Folder =
  mongoose.models.folders || mongoose.model("folders", folderSchema);

export default Folder;
