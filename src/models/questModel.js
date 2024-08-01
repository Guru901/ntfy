import mongoose from "mongoose";

const questSchema = mongoose.Schema(
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
  { timestamps: true },
);

const Questions =
  mongoose.models.questions || mongoose.model("questions", questSchema);

export default Questions;
