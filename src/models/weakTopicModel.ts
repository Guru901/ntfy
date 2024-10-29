import mongoose, { Schema } from "mongoose";

const weakTopicSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const WeakTopic =
  mongoose.models.WeakTopic || mongoose.model("WeakTopic", weakTopicSchema);

export default WeakTopic;
