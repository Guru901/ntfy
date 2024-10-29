import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
    },
    priority: {
      type: String,
      required: [true, "Priority is required"],
    },
    status: {
      type: String,
      required: [true, "Status is required"],
      default: "Pending",
    },
    byUser: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

const Task = mongoose.models.Task || mongoose.model("Task", userSchema);

export default Task;
