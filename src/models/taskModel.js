import mongoose from "mongoose";

const userSchema = mongoose.Schema(
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

const Task = mongoose.models.tasks || mongoose.model("tasks", userSchema);

export default Task;
