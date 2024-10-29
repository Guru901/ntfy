import mongoose, { Schema } from "mongoose";

const questSchema = new Schema(
  {
    subject: {
      type: String,
      required: [true, "subject is required"],
    },
    questions: {
      type: String,
      required: [true, "question is required"],
    },
    byUser: {
      type: mongoose.Schema.ObjectId,
      required: [true, "userId is required"],
    },
  },
  { timestamps: true }
);

const Questions =
  mongoose.models.Question || mongoose.model("Question", questSchema);

export default Questions;
